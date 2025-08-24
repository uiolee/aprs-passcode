<script lang="ts">
	const { pageUrl } = $props();

	import {
		deLocalizeUrl,
		localizeUrl,
		locales,
		extractLocaleFromUrl
	} from '$lib/paraglide/runtime';
	import { URLPrefix } from './shared.svelte';

	let urlCanonical = new URL(pageUrl.pathname, URLPrefix);

	const alternateUrls: { [K in (typeof locales)[number]]?: URL } = {};
	const urlDefault = deLocalizeUrl(urlCanonical);
	for (const locale of locales) {
		if (locale !== extractLocaleFromUrl(pageUrl)) {
			const urlLocalized = localizeUrl(urlCanonical, { locale });
			alternateUrls[locale] = urlLocalized;
		}
	}
</script>

<link href={urlCanonical.href} rel="canonical" />
{#if Object.keys(alternateUrls).length > 0}
  {#each Object.entries(alternateUrls) as [locale, url] (locale)}
    <link rel="alternate" hreflang={locale} href={url.href} />
  {/each}
{/if}
<link href={urlDefault.href} hreflang="x-default" rel="alternate" />
