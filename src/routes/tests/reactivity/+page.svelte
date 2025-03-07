<script lang="ts">
  import { Sweater } from "$lib/index.js";
</script>

<Sweater
  name="Runes can be set and used in template"
  body={async ({ given, expect, set }) => {
    let value = $state(0);
    // svelte-ignore state_referenced_locally
    const flush = set(() => ({ value }));
    const { span } = await given("span");

    let previous = value;
    for (const current of [1, 2, 3].map((i) => i + 1)) {
      value = current;
      expect(span).toHaveTextContent(`${previous}`);
      flush();
      expect(span).toHaveTextContent(`${current}`);
      flush((value = previous));
      expect(span).toHaveTextContent(`${previous}`);
      flush((value = previous = current));
    }
  }}
>
  {#snippet vest(pocket: { span: HTMLSpanElement; value: number })}
    <span bind:this={pocket.span}>
      {pocket.value}
    </span>
  {/snippet}
</Sweater>
