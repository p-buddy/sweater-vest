# Sweater Vest (<ins style="color:white"><span style="color:#aa1e1e"><span>**S**</span><sup style="color:grey">weater</sup> <span style="color:#aa1e1e">**v**</span><sub style="color:#aa1e1e">_elte_</sub></span> <sub style="">_t_</sub><span style="text-">est</span></ins>)

[Sweater Vest](https://www.npmjs.com/package/sweater-vest) is a svelte utility (component) that simplifies testing svelte components in browser environments, specifically when you're testing multiple components together and/or within complex markup.

[](./src/routes/docs/anatomy/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 142 chars: 3948 -->
## Anatomy of a Sweater Vest Test

Jump to the [complete example](#complete) below if you want to see what a Sweater Vest test looks like in its entirety.

[](?register=recipe(pkg)&region=remap(,'''$lib_slash_index.js''','''sweater-vest''',_))

[](?register=recipe(no-body)&region=splice-end(body,5),splice-start(body,-6),replace(body,'...'))

[](?register=recipe(no-snippet)&region=replace(snippet,'...'))

### `Sweater` Component

Begin a [Sweater Vest](https://www.npmjs.com/package/sweater-vest) test by utilizing the `Sweater` component imported from the `"sweater-vest"` package.

[](src/routes/docs/anatomy/+page.svelte?apply=recipe(pkg,no-body,no-snippet))
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

### `vest` Snippet

The `Sweater` component expects a `vest` snippet to be defined which takes a single argument (which is called `pocket` as a convention).

[](?register=recipe(trim-pocket)&region=trim(pocket))

[](?register=recipe(no-pocket-type)&region=splice-end(type,1),replace(type,...))

[](?register=recipe(no-markup)&region=replace(markup,...))

[](src/routes/docs/anatomy/+page.svelte?region=extract(component)&apply=recipe(no-body,no-pocket-type,trim-pocket,no-markup))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 11 chars: 95 -->

```svelte
<Sweater
  ...
>
  {#snippet vest(pocket: ...)}
    ...
  {/snippet}
</Sweater>
```

<!-- p↓ END -->

#### `pocket` Argument Type

You as the test author will determine the type of the `pocket` argument based on the requirements of your test. The type should include:

- Any elements and/or componets within your markup that you want to `bind:this` to in order to interact with in your test's [body](#body-function-prop). For example:

[](?register=recipe(no-template)&region=replace(templated,...))

[](src/routes/docs/anatomy/+page.svelte?apply=recipe(trim-pocket,no-template)&region=extract(snippet),trim-start(bind),single-line(pocket),splice-end(pocket,-1),replace(value,...))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 9 chars: 140 -->

```svelte
{#snippet vest(pocket: { container: HTMLDivElement; ... })}
  <div bind:this={pocket.container}>
    ...
  </div>
{/snippet}
```

<!-- p↓ END -->

- Any data that will be utilized within your markup (which will be initilalized / manipulated by your test's [body](#body-function-prop)). For example:

[](src/routes/docs/anatomy/+page.svelte?apply=recipe(trim-pocket)&region=extract(snippet,para),trim-start(bind),single-line(pocket),splice-end(pocket,-1),replace(container,'...,'),splice-start(bind,-11),replace(bind,'...-unangle-'))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 9 chars: 115 -->

```svelte
{#snippet vest(pocket: { ..., value: string; })}
  <div ...>
    {pocket.value}
  </div>
{/snippet}
```

<!-- p↓ END -->

### `body` Function Prop

[](src/routes/docs/anatomy/+page.svelte?region=extract(component),replace(snippet,...),replace(implementation,...),splice-start(body,1))
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

[](src/routes/docs/anatomy/+page.svelte?apply=recipe(trim-pocket,pkg)&region=splice-start(body,1),single-line(pocket),splice-end(pocket,-1),splice-start(bind,1))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 22 chars: 490 -->

```svelte
<script lang="ts">
  import { Sweater } from "sweater-vest";
</script>

<Sweater
  body={async (harness) => {
    const { set, given, expect } = harness;
    set({ value: "Hello, world!" });
    const { container } = await given("container");
    expect(container.textContent).toBe("Hello, world!");
  }}
>
  {#snippet vest(pocket: { container: HTMLDivElement; value: string; })}
    <div bind:this={pocket.container}>
      {pocket.value}
    </div>
  {/snippet}
</Sweater>
```

<!-- p↓ END -->
<!-- p↓ END -->

[](./src/routes/docs/config/README.md)
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 73 chars: 1513 -->
## Configuration

The `<Sweater>` component can (optionally) be used to configure and group similar tests, as demonstrated below.

### Without Config

[](src/routes/docs/config/none/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
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

### With Nesting

[](src/routes/docs/config/nested/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
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

### Sequentially

[](src/routes/docs/config/sequential/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

### Mixed

[](src/routes/docs/config/mixed/+page.svelte?region=replace(pkg,'''sweater-vest''',_))
<!-- p↓ BEGIN -->
<!-- p↓ length lines: 5 chars: 16 -->

```svelte

```

<!-- p↓ END -->

<!-- p↓ END -->