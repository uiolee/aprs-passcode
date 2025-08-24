<script lang="ts">
  import { onMount } from 'svelte';
  import { calcPass, cleanse, getSearchParams } from '$lib/utils';

  import { m } from '$lib/paraglide/messages';

  let callsignInput: string = $state('');
  let callsignStd: string = $derived(cleanse(callsignInput));
  let passcode: string = $derived(callsignStd.length > 0 ? String(calcPass(callsignStd)) : '');
  let log: string = $state('');
  let clipboard: boolean = $state(Boolean(navigator.clipboard));

  function copyToClipboard(ev: MouseEvent) {
    const value = ev.target?.previousElementSibling?.value;
    navigator.clipboard
      .writeText(value)
      .then(
        (res) => {
          ev.target.disabled = true;
          setTimeout(() => {
            ev.target.disabled = false;
          }, 100);
        },
        (err) => {
          log = `${m.copyFail()} ${err}`;
        },
      )
      .finally(() => {
        setTimeout(() => {
          log = '';
        }, 5000);
      });
  }

  onMount(() => {
    const callsignParam = getSearchParams('callsign');
    if (callsignParam) {
      callsignInput = callsignParam;
    }
  });

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
      {#if true}
        <input
          id="reset-callsign"
          type="reset"
          class="outline contrast"
          disabled={callsignInput.length <= 0}
          value={m.reset()}
        />
      {/if}
    </fieldset>
  </form>
  <small id="log">{log}</small>
</article>
<article>
  <label for="callsignStd">{m.Callsign()}</label>
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
  <label for="passcode">{m.Passcode()}</label>
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
