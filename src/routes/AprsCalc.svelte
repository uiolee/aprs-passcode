<script lang="ts">
  import { onMount } from 'svelte';
  import { calcPass, cleanse, getSearchParams } from '$lib/utils';

  import { m } from '$lib/paraglide/messages';
  import { baseLocale, getLocale } from '$lib/paraglide/runtime';

  let callsignInput: string = $state('');
  let callsignStd: string = $derived(cleanse(callsignInput));
  let passcode: string = $derived(callsignStd.length > 0 ? String(calcPass(callsignStd)) : '');
  let log: string = $state('');
  let clipboard: boolean = $state(Boolean(navigator.clipboard));

  $effect(() => {
    let n: number = 0;
    if (log !== '') {
      n = setTimeout(() => {
        log = '';
      }, 3000);
    }
    return () => {
      if (n) {
        clearTimeout(n);
      }
    };
  });

  function copyToClipboard(ev: MouseEvent) {
    const value = ev.target?.previousElementSibling?.value;
    return navigator.clipboard.writeText(value).then(
      (res) => {
        ev.target.disabled = true;
        setTimeout(() => {
          ev.target.disabled = false;
        }, 100);
      },
      (err) => {
        log = [m.copyFail(), err].join(' ');
        console.error(err);
      },
    );
  }

  const pasteTextToCallsignInput = (ev) => {
    return navigator.clipboard
      .readText()
      .then((text) => {
        callsignInput = text.trim();
      })
      .catch((err) => {
        log = [m.pasteFail(), err].join(' ');
        console.error(err);
      });
  };
  onMount(() => {
    const callsignParam = getSearchParams('callsign');
    if (callsignParam) {
      callsignInput = callsignParam;
    }
  });

  const locale = getLocale();

  $inspect(log);
  $inspect(callsignInput, callsignStd, passcode).with(console.debug);
</script>

<article>
  <form>
    <fieldset data-tooltip={m.callsignInputTip()} role="group">
      <input
        autocomplete="callsign"
        autofocus
        bind:value={callsignInput}
        id="callsign"
        name="callsign"
        placeholder={m.inputCallsign()}
        type="text"
      />
      <input
        class="outline contrast"
        disabled={callsignInput.length <= 0}
        id="reset-callsign"
        type="reset"
        value={m.reset()}
      />
      <input
        class="outline paste"
        disabled={!clipboard}
        id="paste-callsignInput"
        onclick={pasteTextToCallsignInput}
        type="button"
        value={m.paste()}
      />
    </fieldset>
  </form>
  <small id="log">{log}</small>
</article>
<article>
  <label for="callsignStd"
    >{m.Callsign()}
    {#if locale !== baseLocale}<span lang={baseLocale}
        >{m.Callsign({}, { locale: baseLocale })}</span
      >{/if}</label
  >
  <fieldset role="group">
    <input bind:value={callsignStd} id="callsignStd" name="callsignStd" readonly />
    <input
      class="secondary copy"
      disabled={!clipboard || callsignStd.length <= 0}
      id="copy-callsignStd"
      onclick={copyToClipboard}
      type="button"
      value={m.copy()}
    />
  </fieldset>
  <label for="passcode"
    >{m.Passcode()}
    {#if locale !== baseLocale}<span lang={baseLocale}
        >{m.Passcode({}, { locale: baseLocale })}</span
      >{/if}</label
  >
  <fieldset role="group">
    <input bind:value={passcode} id="passcode" name="passcode" readonly />
    <input
      class="copy"
      disabled={!clipboard || passcode.length <= 0}
      id="copy-passcode"
      onclick={copyToClipboard}
      type="button"
      value={m.copy()}
    />
  </fieldset>
</article>

<style>
  #callsign,
  #passcode,
  #callsignStd {
    font-family: 'Fira Mono', Consolas, 'Courier New', Courier, ui-monospace, monospace;
    font-weight: bold;
  }

  #passcode,
  #callsignStd {
    text-align: center;
    font-size: xx-large;
  }
</style>
