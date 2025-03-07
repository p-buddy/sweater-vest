<script lang="ts">
  import { TestAborted } from "$lib/utils.js";
  import Sweater from "$lib/Sweater.svelte";

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
    body={async ({ given, expect, onAbort, untilNextFrame, root, set }) => {
      expect(rendered).toBe(key);
      const { div } = await given("div");
      expect(rendered).toBe(key + 1);

      if (key > 0) expect(should).toBe(2);
      expect(shouldNot).toBe(0);

      if (key >= 2) return;

      should = 0;
      shouldNot = 0;

      let exit = false;
      onAbort(() => (exit = true));
      expect(div).toHaveTextContent(`${key}`);
      expect(div.parentElement).toBe(root);
      expect(root.parentElement).not.toBe(null);
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
