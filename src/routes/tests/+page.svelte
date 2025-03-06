<script lang="ts">
  import Vest from "$lib/Vest.svelte";

  const values = [0, 1, 2, 3];
</script>

{#each values as i}
  <Vest
    body={async ({ given, expect, root }) => {
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
  </Vest>
{/each}

<Vest config orientation="VERTICAL" theme="abyss" mode="serial" />

{#each values.map((i) => i + values.length) as i}
  <Vest
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
  </Vest>
{/each}

<Vest config orientation="VERTICAL" theme="abyss" mode="serial">
  {#each values.map((i) => i + values.length * 2) as i}
    <Vest
      mode="serial"
      position="above"
      body={async (harness) => {
        await new Promise((resolve) => setTimeout(resolve, 10000));
        console.log("done");
      }}
    >
      {#snippet vest(pocket: never)}
        {i}
      {/snippet}
    </Vest>
  {/each}
</Vest>
