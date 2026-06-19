<script>
	import './SimpleLink.css';

	export let props = {};

	export let type = 'red'; // red - green - transparent

	export let href = '';

	export let actionCallback = false;

	function onClick(event) {
		if (actionCallback) {
			event.preventDefault();
			actionCallback();
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-missing-attribute -->
<a {...props} {href} on:click={onClick} class={'link-style ' + type} rel="noopener noreferrer">
	<slot />
</a>
