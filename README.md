# Sweater Vest (<ins style="color:white"><span style="color:#aa1e1e"><span>**S**</span><sup style="color:grey">weater</sup> <span style="color:#aa1e1e">**v**</span><sub style="color:#aa1e1e">_elte_</sub></span> <sub style="">_t_</sub><span style="text-">est</span></ins>)


[](./src/routes/examples/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 81 chars: 1680 -->
## Examples

### Config

[](src/routes/examples/config/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 73 chars: 1539 -->
#### Configuration

The `<Sweater>` component can (optionally) be used to configure and group similar tests, as demonstrated below.

##### Without Config

[](src/routes/examples/config/none/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 15 chars: 296 -->

```svelte
<script lang="ts">
  import { Sweater } from "sweater-vest";
</script>

<Sweater name="Test 1" body={async (harness) => {}}>
  {#snippet vest(pocket: {})}{/snippet}
</Sweater>

<Sweater name="Test 2" body={async (harness) => {}}>
  {#snippet vest(pocket: {})}{/snippet}
</Sweater>
```

<!-- p↓ END -->

##### With Nesting

[](src/routes/examples/config/nested/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 16 chars: 335 -->

```svelte
<script lang="ts">
  import { Sweater } from "sweater-vest";
</script>

<Sweater config>
  <Sweater name="Test 1" body={async (harness) => {}}>
    {#snippet vest(pocket: {})}{/snippet}
  </Sweater>
  <Sweater name="Test 2" body={async (harness) => {}}>
    {#snippet vest(pocket: {})}{/snippet}
  </Sweater>
</Sweater>
```

<!-- p↓ END -->

##### Sequentially

[](src/routes/examples/config/sequential/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

##### Mixed

[](src/routes/examples/config/mixed/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

<!-- p↓ END -->
<!-- p↓ END -->