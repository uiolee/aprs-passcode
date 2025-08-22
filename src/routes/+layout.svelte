<script lang="ts">
	import '$lib/pico.custom.css';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';

	import { onMount } from 'svelte';
	import { Stat } from './shared.svelte';

	import { page } from '$app/state';

	import UrlCanonical from './UrlCanonical.svelte';
	import DeferCss from './DeferCss.svelte';

	let { children } = $props();

	onMount(() => {
		setTimeout(() => {
			Stat.isBusy = true;
		}, 0);
	});
</script>

<svelte:head>
	<DeferCss href="https://cdnjs.cloudflare.com/ajax/libs/picocss/2.1.1/pico.lime.min.css"
						integrity="sha512-EegV8RrOjpMhZJtOEeY9SK+1nClc+2iedBSwa9G7VvOyQUbnHn0x63t+wg/o/Iwqhg+6HjK38bAGobRTWWnm2Q==" />
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
