<script lang="ts">
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import { onMount } from 'svelte';
	import { Stat } from './shared.svelte';

	import { page } from '$app/state';

	let { children } = $props();

	onMount(() => {
		setTimeout(() => {
			Stat.isBusy = true;
		}, 0);
	});
</script>

<svelte:head></svelte:head>

<!--
<div style="display:none">
	+ {#each locales as locale}
		+ <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		+
	{/each}
	+
</div>
-->

<div class="app" id="body">
	<Header />

	<main class="container">
		{@render children()}
	</main>

	<Footer />
</div>
