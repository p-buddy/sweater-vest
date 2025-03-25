<script lang="ts">
  import { Sweater } from /** pkg */ "$lib/index.js" /** pkg */;
</script>

<!-- pd: component begin -->
<!-- pd: component-head begin -->
<Sweater
  body={/* pd: body begin */ async (harness) => {
    /* pd: implementation begin */
    const { set } = harness;
    /* pd: implementation end */
    /* pd: body end */
  }}
>
  <!-- pd: component-head end -->
  <!-- pd: snippet begin -->
  <!-- pd: snippet-head begin -->
  {#snippet vest(
    /* pd: pocket begin */
    pocket: /* pd: type begin */
    {
      /* pd: div-prop */
      container: HTMLDivElement;
      /* pd: div-prop */
      /* pd: value-prop */
      value: string;
      /* pd: value-prop */
    } /* pd: type end */,
    /* pd: pocket end */
  )}
    <!-- pd: snippet-head end -->
    <!-- pd: markup begin -->
    <!-- pd: div-open begin -->
    <div bind:this={/* pd: bind begin */ pocket.container}>
      <!-- pd: bind end -->
      <!-- pd: div-open end -->
      <!-- pd: para begin -->
      <p>{pocket.value}</p>
      <!-- pd: para end -->
      <!-- pd: div-close begin -->
    </div>
    <!-- pd: div-close end -->
    <!-- pd: markup end -->
  {/snippet}
  <!-- pd: snippet end -->
</Sweater>
<!-- pd: component end -->
