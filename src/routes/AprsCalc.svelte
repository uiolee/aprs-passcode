<script lang="ts">
	import { onMount } from 'svelte';
	import { calcPass, cleanse, getSearchParams } from '$lib/utils';

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
					log = `复制失败！ Failed to copy! ${err}`;
				}
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
		<fieldset role="group" data-tooltip="在此处输入你的呼号。Input your callsign here.">
			<input
				id="callsign"
				type="text"
				name="callsign"
				placeholder="呼号/Callsign"
				autocomplete="callsign"
				bind:value={callsignInput}
			/>
			<input
				id="submit"
				type="submit"
				disabled={callsignInput.length <= 0}
				value="计算/calculate"
			/>
		</fieldset>
		<small id="callsign-helper"> 在此处输入你的呼号。Input your callsign here. </small>
	</form>
	<small id="log">{log}</small>
</article>
<article>
	<label for="callsignStd">呼号/Callsign</label>
	<fieldset role="group">
		<input name="callsignStd" id="callsignStd" bind:value={callsignStd} readonly />
		<input
			id="copy-callsignStd"
			type="button"
			class="secondary copy"
			disabled={!clipboard || callsignStd.length <= 0}
			onclick={copyToClipboard}
			value="复制/copy"
		/>
	</fieldset>
	<label for="passcode">通行码/Passcode</label>
	<fieldset role="group">
		<input name="passcode" id="passcode" bind:value={passcode} readonly />
		<input
			id="copy-passcode"
			type="button"
			class="secondary copy"
			disabled={!clipboard || passcode.length <= 0}
			onclick={copyToClipboard}
			value="复制/copy"
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
