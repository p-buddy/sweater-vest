import { getContext, setContext, type Component, mount } from "svelte";
import type Container from "./Container.svelte";

/** Can be replaced in the future with `Promise.withResolvers` */
export const deferred = <T,>() => {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
};

export type Deferred<T> = ReturnType<typeof deferred<T>>;

export const retrieve = <Key,>(map: Map<Key, Deferred<any>>, key: Key) => {
  if (map.has(key)) {
    const existing = map.get(key)!;
    map.delete(key);
    return existing;
  }
  const _deferred = deferred();
  map.set(key, _deferred);
  return _deferred;
};

export class PromiseQueue {
  Types?: {
    Task: Record<"start" | "complete", Promise<any>> & {
      mode: "serial" | "parallel";
    };
  }

  private readonly root: Deferred<void>;
  private tail?: Required<PromiseQueue>["Types"]["Task"];

  constructor() {
    this.root = deferred();
  }

  open() {
    this.root.resolve();
  }

  add(mode: Required<PromiseQueue>["Types"]["Task"]["mode"], fn: () => Promise<any>) {
    let task: Required<PromiseQueue>["Types"]["Task"];

    if (!this.tail) {
      const start = this.root.promise;
      task = { mode, start, complete: start.then(fn) };
    } else if (mode === "serial") {
      const start = this.tail.complete;
      task = { mode, start, complete: start.then(fn) };
    } else if (this.tail.mode === "serial") {
      const start = this.tail.complete;
      task = { mode, start, complete: start.then(fn) };
    } else {
      const { start, complete } = this.tail;
      task = { mode, start, complete: Promise.all([complete, start.then(fn)]) };
    }

    task.complete.finally(() => {
      if (this.tail === task) this.tail = undefined;
    });

    this.tail = task;
    return task.start;
  };
}

type ContainerMapSupplement = {
  total: number;
  find(index: number): Container;
  set current(container: Container);
  get context(): Container | undefined;
  each(callback: (container: Container) => void): void;
  reset(): void;
};

type ContainerMap = Record<number, Container> &
  Map<number, Container> &
  ContainerMapSupplement;

export const createContainerMap = () => {
  const contextKey = "container";
  const contexts: Container[] = [];
  return new Proxy(
    new Map<number, Container>() as ContainerMap,
    {
      get(target, prop) {
        const key = prop as keyof ContainerMapSupplement;

        switch (key) {
          case "context":
            return getContext(contextKey) satisfies ContainerMap[typeof key];
          case "find":
            return ((index: number) => {
              while (!target.has(index) && index >= 0) index--;
              const container = target.get(index);
              if (!container) throw new Error("No container found");
              return container;
            }) satisfies ContainerMap[typeof key];
          case "total":
            return (target.size + contexts.length) satisfies ContainerMap[typeof key];
          case "each":
            return ((callback: (container: Container) => void) => {
              for (const container of target.values()) callback(container);
              for (const context of contexts) callback(context);
            }) satisfies ContainerMap[typeof key];
          case "reset":
            return (() => {
              target.clear();
              contexts.length = 0;
            }) satisfies ContainerMap[typeof key];
        }

        const numeric = parseInt(String(prop));
        if (isNaN(numeric)) return target[prop as keyof typeof target];
        return target.get(numeric);
      },
      set(target, prop, value) {
        const key = prop as keyof ContainerMapSupplement;

        switch (key) {
          case "current":
            const current = value as ContainerMap[typeof key];
            setContext(contextKey, current);
            contexts.push(value);
            return true;
        }

        const numeric = parseInt(String(prop));
        if (isNaN(numeric)) return true;
        target.set(numeric, value);
        return true;
      },
    })
}

export type ExtractFromComponent<T extends Component<any, any, any>> =
  T extends Component<infer Props, infer Exports, infer Bindings>
  /**/ ? { props: Props; exports: Exports; bindings: Bindings }
  /**/ : never;

export type Mounted<T extends Component<any, any, any>> =
  ReturnType<typeof mount<ExtractFromComponent<T>["props"], ExtractFromComponent<T>["exports"]>>;

class TestAborted extends Error {
  constructor(message: string = "Test aborted") {
    super(message);
  }
}

export const createTestAbortMechanism = () => {
  const controller = new AbortController();
  const { signal } = controller;

  const tryError = () => {
    if (signal.aborted) throw new TestAborted();
    return true;
  };

  type Fn = (...args: any[]) => any;

  const wrap = <T extends Fn>(fn: ReturnType<T> extends Promise<any> ? never : T) =>
    (...args: Parameters<T>) => tryError() && fn(...args);

  const until = new Promise<void>((_, reject) => {
    signal.addEventListener("abort", reject, { once: true });
  });

  const proxy = <T extends object>(_target: T) => new Proxy(_target, {
    get(target, prop) {
      return tryError() && target[prop as keyof T];
    },
    set(target, prop, value) {
      tryError();
      target[prop as keyof T] = value;
      return true;
    }
  });

  return { signal, tryError, wrap, until, controller, proxy };
}