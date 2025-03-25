# Sweater Vest (<ins style="color:white"><span style="color:#aa1e1e"><span>**S**</span><sup style="color:grey">weater</sup> <span style="color:#aa1e1e">**v**</span><sub style="color:#aa1e1e">_elte_</sub></span> <sub style="">_t_</sub><span style="text-">est</span></ins>)

## Anatomy of a Sweater Vest Test

### `Sweater` Component (Required)

[](./src/routes/examples/anatomy/+page.svelte?region=replace(pkg,'''sweater-vest''',_),remap(component-head,body-equal--curly-,),splice(body,5),replace(body,...),replace(snippet,...))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 13 chars: 121 -->

```svelte
<script lang="ts">
  import { Sweater } from "sweater-vest";
</script>

<Sweater
  ...
>
  ...
</Sweater>
```

<!-- p↓ END -->

### `vest` Snippet (Required)

[](./src/routes/examples/anatomy/+page.svelte?region=remap(snippet-head,-line-,-),remap(snippet-head,-----),remap(snippet-head,',---'),extract(component),splice(body,-6),splice(body,5),replace(body,...),replace(type,...),replace(markup,...))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 11 chars: 99 -->

```svelte
<Sweater
  ...
>
  {#snippet vest(pocket: ...,   )}
    ...
  {/snippet}
</Sweater>
```

<!-- p↓ END -->

#### Type of `pocket`

You decide the type of the `pocket` argument, which should be an object containing the following properties:
- any elements that you want to `bind:this` to in order to interact with in your test body. For example:

[](./src/routes/examples/anatomy/+page.svelte?region=remap(pocket,-line-,-),splice(pocket,-5),splice(pocket,3),remap(pocket,-pocket,pocket),remap(snippet-head,----),remap(snippet-head,-curly---,-curly-),remap(snippet-head,',---'),extract(snippet),remap(bind,-,),replace(para,...),replace(value-prop,...),remap(pocket,--),splice(type,1))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 9 chars: 150 -->

```svelte
  {#snippet vest(pocket: { container: HTMLDivElement; ... })}
    <div bind:this={pocket.container}>
      ...
    </div>
  {/snippet}
```

<!-- p↓ END -->

- any data that will be utilized within your test markup (that should be set within your test body)

[](./src/routes/examples/anatomy/+page.svelte?region=remap(pocket,-line-,-),splice(pocket,-5),splice(pocket,3),remap(pocket,-pocket,pocket),remap(snippet-head,----),remap(snippet-head,-curly---,-curly-),remap(snippet-head,',---'),extract(snippet),replace(div-prop,'...,'),remap(type,--),splice(type,1),replace(div-open,...),splice(markup,0,-----...),remove(div-close))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 9 chars: 123 -->

```svelte
  {#snippet vest(pocket: { ..., value: string; })}
    ...
      <p>{pocket.value}</p>
    ...
  {/snippet}
```

<!-- p↓ END -->

### `body` Function Prop (Required)

[](./src/routes/examples/anatomy/+page.svelte?region=extract(component),replace(snippet,...),replace(implementation,...),remap(body,-async,async))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 11 chars: 85 -->

```svelte
<Sweater
  body={async (harness) => {
    ...
  }}
>
  ...
</Sweater>
```

<!-- p↓ END -->

### Complete 

[](./src/routes/examples/anatomy/+page.svelte?region)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 26 chars: 391 -->

```svelte
<script lang="ts">
  import { Sweater } from /** pkg */ "$lib/index.js" /** pkg */;
</script>

<Sweater
  body={ async (harness) => {
    const { set } = harness;
  }}
>
  {#snippet vest(
    pocket:
    {
      container: HTMLDivElement;
      value: string;
    },
  )}
    <div bind:this={ pocket.container}>
      <p>{pocket.value}</p>
    </div>
  {/snippet}
</Sweater>

```

<!-- p↓ END -->

[](./src/routes/examples/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 79 chars: 1675 -->
#### Examples

[](src/routes/examples/config/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 73 chars: 1544 -->
##### Configuration

The `<Sweater>` component can (optionally) be used to configure and group similar tests, as demonstrated below.

###### Without Config

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

###### With Nesting

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

###### Sequentially

[](src/routes/examples/config/sequential/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

###### Mixed

[](src/routes/examples/config/mixed/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

<!-- p↓ END -->
<!-- p↓ END -->