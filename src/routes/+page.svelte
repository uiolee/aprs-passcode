<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import AprsCalc from './AprsCalc.svelte';
</script>

<svelte:head>
  <title>{m.title()}</title>
  <meta name="description" content={m.description()} />
</svelte:head>

<AprsCalc />
