<script lang="ts">
  import { Stat } from './shared.svelte';

  import { getLocale, locales, localizeHref, setLocale } from '$lib/paraglide/runtime';
  import { m } from '$lib/paraglide/messages.js';
  import { page } from '$app/state';
</script>

<header>
  <nav>
    <ul></ul>
    <ul>
      <li>
        <div
          id="title"
          onclick={() => {
            location.replace('/');
          }}
          role="link"
          tabindex="-1"
        >
          <strong aria-busy={!Stat.isBusy}>{m.title()}</strong>
        </div>
      </li>
    </ul>
    <ul>
      <li>
        <details class="dropdown">
          <summary> {m.language()}: <code>{getLocale()}</code></summary>
          <ul dir="rtl">
            {#each locales as locale (locale)}
              <li>
                <a
                  onclick={() => {
                    setLocale(locale);
                    // location.replace(localizeHref(page.url.pathname, { locale }));
                  }}
                  href={localizeHref(page.url.pathname, { locale })}><code>{locale}</code></a
                >
              </li>
            {/each}
          </ul>
        </details>
      </li>
    </ul>
  </nav>
</header>

<style>
  #title {
    cursor: pointer;
  }
</style>
