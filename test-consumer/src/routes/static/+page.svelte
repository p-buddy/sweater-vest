<script lang="ts">
  import { Sweater } from "sweater-vest";
</script>

<Sweater body={async () => {}}>
  {#snippet vest(pocket: {})}
    <div class="w-full h-full bg-red-500">
      <h1>Veset</h1>
    </div>
  {/snippet}
</Sweater>
