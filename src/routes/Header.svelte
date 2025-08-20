<script lang="ts">
	import { Stat } from './shared.svelte';
</script>

<header>
	<nav>
		<ul></ul>
		<ul>
			<li>
				<div
					on:click={() => {
						location.replace('/');
					}}
				>
					<strong aria-busy={!Stat.isBusy}>APRS Passcode Calculator</strong>
				</div>
			</li>
		</ul>
		<ul></ul>
	</nav>
</header>

<style>
	nav ul li div {
		cursor: pointer;
	}
</style>
