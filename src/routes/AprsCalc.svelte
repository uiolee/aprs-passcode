<script lang="ts">
  import { Stat } from './shared.svelte';
  import { onMount } from 'svelte';
  import { calcPass, cleanse, getSearchParams } from '$lib/utils';

  import { m } from '$lib/paraglide/messages';
  import { baseLocale, getLocale } from '$lib/paraglide/runtime';

  let callsignInput: string = $state('');
  let callsignStd: string = $state('');
  let passcode: string = $derived(callsignStd.length > 0 ? String(calcPass(callsignStd)) : '');
  let log: string = $state('');
  let clipboard: boolean = $state(Boolean(navigator.clipboard));
  let liveMode = $state(true);

  $effect(() => {
    if (callsignInput.length <= 0) {
      callsignStd = '';
    } else if (liveMode) {
      main();
    }
  });

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

  const main = () => {
    callsignStd = cleanse(callsignInput);
  };

  const copyToClipboard = async (ev: MouseEvent) => {
    const target = ev.target as EventTarget;
    const value = target.previousElementSibling.value;
    target.disabled = true;
    Stat.isBusy = true;
    return await navigator.clipboard
      .writeText(value)
      .then(() => {})
      .catch((err) => {
        log = [m.copyFail(), err].join(' ');
        console.error(err);
      })
      .finally(() => {
        setTimeout(() => {
          target.disabled = false;
          Stat.isBusy = false;
        }, 1);
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
  $inspect(liveMode);
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
      {#if callsignInput.length > 0}
        <input
          class="outline contrast"
          disabled={!(callsignInput.length > 0)}
          id="reset-callsign"
          type="reset"
          value={m.reset()}
        />
      {/if}
      {#if !liveMode}
        <input
          id="submit"
          type="submit"
          disabled={!(callsignInput.length > 0)}
          value={m.compute()}
          onclick={main}
        />
      {/if}
    </fieldset>
  </form>

  <fieldset>
    <label>
      <input name="livemode" type="checkbox" role="switch" bind:checked={liveMode} />
      {m.livemode()}
    </label>
  </fieldset>

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
