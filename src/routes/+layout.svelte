<script lang="ts">
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import { onMount } from 'svelte';
	import { Stat } from './shared.svelte';
	let { children } = $props();
	onMount(() => {
		setTimeout(() => {
			Stat.isBusy = true;
		}, 0);
	});
</script>

<svelte:head></svelte:head>

<div class="app" id="body">
	<Header />

	<main class="container">
		{@render children()}
	</main>

	<Footer />
</div>
