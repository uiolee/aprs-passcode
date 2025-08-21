<script>
	import { URLPrefix } from './shared.svelte.js';

	const versionText = __VITE_BUILD_VERSION;
</script>

<footer>
	<nav>
		<span><a href="https://github.com/uiolee/aprs-passcode/" target="_blank" rel="noopener noreferrer">Github</a></span>
		<span><a href="{URLPrefix}">{URLPrefix}</a></span>
		<span>{versionText}</span>
	</nav>
</footer>
