<script lang="ts">
  import { TestAborted } from "$lib/utils.svelte.js";
  import { Sweater } from "$lib/index.js";

  let key = $state(0);

  let should = 0;
  let shouldNot = 0;
  // svelte-ignore non_reactive_update
  let rendered = 0;

  const shouldGetHere = () => should++;
  const shouldNotGetHere = () => shouldNot++;
</script>

{#key key}
  <Sweater
    name="Test aborts on re-render (e.g. on hot reload)"
    body={async ({ given, expect, onAbort, untilNextFrame, root, set }) => {
      expect(rendered).toBe(key);
      const { div } = await given("div");
      expect(rendered).toBe(key + 1);

      if (key > 0) expect(should).toBe(2);
      expect(shouldNot).toBe(0);

      if (key >= 2) return;

      should = 0;
      shouldNot = 0;

      expect(div).toHaveTextContent(`${key}`);
      expect(div.parentElement).toBe(root);
      expect(root.parentElement).not.toBe(null);

      let exit = false;
      onAbort(() => (exit = true));
      key++;
      while (!exit) await untilNextFrame();
      shouldGetHere();
      expect(root.parentElement).toBe(null);
      try {
        set({});
      } catch (e) {
        if (e instanceof TestAborted) shouldGetHere();
      }
      set({});
      shouldNotGetHere();
    }}
  >
    {#snippet vest(pocket: { div: HTMLDivElement })}
      <div bind:this={pocket.div}>{key}</div>
      {void rendered++}
    {/snippet}
  </Sweater>
{/key}
