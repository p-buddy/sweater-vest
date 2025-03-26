<script lang="ts">
  import { Sweater } from "$lib/index.js";
</script>

<!-- pd: component -->
<Sweater
  body={/* pd: body */ async (harness) => {
    /* pd: implementation */
    const { set, given, expect } = harness;
    set({ value: "Hello, world!" });
    const { container } = await given("container");
    expect(container.textContent).toBe("Hello, world!");
    /* pd: implementation */
    /* pd: body */
  }}
>
  <!-- pd: snippet -->
  {#snippet vest(
    /* pd: pocket */
    pocket: /* pd: type */
    {
      /* pd: container */
      container: HTMLDivElement;
      /* pd: container */
      /* pd: value */
      value: string;
      /* pd: value */
    } /* pd: type */,
    /* pd: pocket */
  )}
    <!-- pd: markup -->
    <div bind:this={/* pd: bind */ pocket.container}>
      <!-- pd: bind -->
      <!-- pd: templated -->
      {pocket.value}
      <!-- pd: templated -->
    </div>
    <!-- pd: markup -->
  {/snippet}
  <!-- pd: snippet -->
</Sweater>
<!-- pd: component -->
