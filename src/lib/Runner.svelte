<script lang="ts" module>
  /* TODO: should retrieve dynamically in the case of playwright? */
  import * as tester from "@storybook/test";
  import {
    PromiseQueue,
    type Deferred,
    retrieve,
    createTestAbortMechanism,
  } from "./utils.js";
  import type { Snippet } from "svelte";

  export type TestElements = Record<string, any>;

  type TestHarness<T extends TestElements> = {
    given: (...keys: (keyof T)[]) => Promise<Pick<T, (typeof keys)[number]>>;
    set: (value: Partial<T>) => void;
    root: HTMLElement;
    preventRender: () => () => void;
    signal: AbortSignal;
  } & typeof tester;

  type Mode = Required<PromiseQueue>["Types"]["Task"]["mode"];

  export type Props<T extends TestElements = TestElements> = {
    vest: Snippet<[pocket: T]>;
    body: (harness: TestHarness<T>) => Promise<void>;
    name?: string;
    id?: string;
    mode?: Mode;
    manual?: boolean;
    position?: "above" | "below" | "left" | "right" | "within";
  };

  type Abort = () => void;
  type Complete = () => void;
  type Begin = (abort: Abort) => Complete;

  export const reset = () => {
    queue = new PromiseQueue();
    console.log("reset");
  };

  let queue: PromiseQueue;

  const errorIfRendered = (rendered: boolean) => {
    if (!rendered) return;
    const msg = `Render has already happened, so it cannot be prevented. 
Make sure to call \`harness.preventRender()\` at the top of your body function before anything is \`await\`ed.`;
    throw new Error(msg);
  };
</script>

<script lang="ts" generics="T extends TestElements">
  import { onMount } from "svelte";

  let {
    body,
    vest,
    mode = "parallel",
    manual = false,
    begin,
  }: Props<T> & { begin: Begin } = $props();

  const deferredMap = new Map<string | symbol, Deferred<any>>();

  let root = $state.raw<HTMLDivElement>();
  let gate = $state.raw<Promise<any>>();
  let prevented = $state(manual);

  /* svelte-ignore non_reactive_update */
  let rendered = false;

  const pocket: T = new Proxy({} as T, {
    set: (target, prop, value) => {
      target[prop as keyof T] = value;
      retrieve(deferredMap, prop).resolve(value);
      return true;
    },
    get: (target, prop) => target[prop as keyof T],
  });

  type Harness = TestHarness<T>;

  const abort = createTestAbortMechanism();

  const set: Harness["set"] = abort.wrap((obj: Partial<T>) =>
    Object.entries(obj).forEach(([key, value]) => {
      pocket[key as keyof T] = value;
    }),
  );

  const given: Harness["given"] = async (...keys) => {
    abort.tryError();
    const resolved = await Promise.race([
      Promise.all(keys.map((k) => retrieve(deferredMap, k as string).promise)),
      abort.until,
    ]);
    abort.tryError();
    if (Array.isArray(resolved))
      return resolved.reduce(
        (acc, curr, index) => {
          (acc as any)[keys[index]] = curr;
          return acc;
        },
        {} as Pick<T, (typeof keys)[number]>,
      );
  };

  const preventRender: Harness["preventRender"] = abort.wrap(() => {
    errorIfRendered(rendered);
    prevented = true;
    const render = abort.wrap(() => (prevented = false));
    return render;
  });

  const { controller, signal } = abort;

  const _abort = () => controller.abort();

  onMount(async () => {
    if (!root) throw new Error("Root element not found");
    const harness: TestHarness<T> = abort.proxy({
      ...tester,
      root,
      signal,
      set,
      given,
      preventRender,
    });

    gate = queue.add(mode, async () => {
      const complete = begin(_abort);
      await body(harness).catch((e) => {
        console.error(e);
      });
      deferredMap.clear();
      complete();
    });

    queue.open();
  });
</script>

<div bind:this={root}>
  {#if root && gate}
    {#await gate then}
      {#if !prevented}
        {@render vest(pocket)}
        {void (rendered = true)}
      {/if}
    {/await}
  {/if}
</div>
