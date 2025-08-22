<script lang="ts">
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import { onMount } from 'svelte';
	import { Stat } from './shared.svelte';

	import { page } from '$app/state';

	import UrlCanonical from './UrlCanonical.svelte';

	let { children } = $props();

	onMount(() => {
		setTimeout(() => {
			Stat.isBusy = true;
		}, 0);
	});
</script>

<svelte:head>
	<UrlCanonical pageUrl={page.url} />
</svelte:head>

<!--
<div style="display:none">
	+ {#each locales as locale}
		+ <a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
		+
	{/each}
	+
</div>
-->

<Header />

<main class="container">
	{@render children()}
</main>

<Footer />
