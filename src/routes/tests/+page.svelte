<script lang="ts">
  import Sweater from "$lib/Sweater.svelte";

  const values = [0, 1, 2, 3];
</script>

{#each values as i}
  <Sweater
    body={async ({ given, expect, root, capture }) => {
      const { div } = await given("div");
      expect(div).toHaveTextContent(`${i}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }}
  >
    {#snippet vest(pocket: { div: HTMLDivElement })}
      <div bind:this={pocket.div}>
        {i}
      </div>
    {/snippet}
  </Sweater>
{/each}

<Sweater config orientation="VERTICAL" theme="abyss" mode="serial" />

{#each values.map((i) => i + values.length) as i}
  <Sweater
    mode="parallel"
    body={async ({ preventRender }) => {
      const render = preventRender();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      new Promise((resolve) => setTimeout(resolve, 1000)).then(render);
    }}
  >
    {#snippet vest(pocket: never)}
      {i}
    {/snippet}
  </Sweater>
{/each}

<Sweater config orientation="VERTICAL" theme="abyss" mode="serial">
  {#each values.map((i) => i + values.length * 2) as i}
    <Sweater
      mode="serial"
      position="above"
      body={async ({ capture, signal, set }) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log("done");
      }}
    >
      {#snippet vest(pocket: never)}
        {i}
      {/snippet}
    </Sweater>
  {/each}
</Sweater>
