<script lang="ts" module>
  import type { Props as RunnerProps, TestElements } from "./Runner.svelte";
  import type { Props as ContainerProps } from "./Container.svelte";
  import Container, { next } from "./Container.svelte";
  import { onMount, type Snippet } from "svelte";
  import { createContainerMap } from "./utils.js";

  type ConfigProps = ContainerProps & {
    target?: HTMLElement;
    config: true;
    children?: Snippet;
  };

  type Props<T extends TestElements> = TestElements extends T
    ? ConfigProps
    : RunnerProps<T>;

  const is = <T extends "config" | "test">(
    type: T,
    props: ConfigProps | RunnerProps<any>,
  ): props is T extends "config" ? ConfigProps : RunnerProps<any> => {
    const hasConfig = "config" in props && props.config;
    return type === "config" ? hasConfig : !hasConfig;
  };

  const containers = createContainerMap();

  const counts = {
    tests: 0,
    configs: 0,
  };

  const sum = () => counts.tests + counts.configs;
</script>

<script lang="ts" generics="T extends TestElements">
  let props: Props<T> = $props();

  const index = sum();

  onMount(() => {
    const test = is("test", props);
    if (test) (containers.context ?? containers.find(index)).push(props);
    counts[test ? "tests" : "configs"]--;
    if (sum() > 0) return;
    containers.each((container) => container.setTotal(containers.total));
    containers.reset();
    next();
  });
</script>

{#if is("config", props)}
  {#if props.children}
    <Container bind:this={containers.current} {...props} />
    {@render props.children()}
  {:else}
    <Container bind:this={containers[index]} {...props} />
  {/if}
  {void counts.configs++}
{:else}
  {#if index === 0}
    <Container bind:this={containers[index]} />
  {/if}
  {void counts.tests++}
{/if}
