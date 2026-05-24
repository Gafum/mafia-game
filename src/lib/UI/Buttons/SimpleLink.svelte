<script>
	export let props = {};

	export let type = 'red';

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
<a {...props} {href} on:click={onClick} class={'link-style ' + type}>
	<slot />
</a>

<style>
	.red {
		--main-bg-color: #ff4444;
	}

	.green {
		--main-bg-color: #2c9182;
	}

	.link-style {
		background: var(--main-bg-color);
		color: white;
		border: none;
		padding: 8px 15px;
		border-radius: 6px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		min-height: 33px;
		transition-property: filter, box-shadow, transform, background;
		transition-duration: 0.2s;
		margin: 20px auto 4px;
		font-size: 18px;
		text-align: center;
		width: 100%;
		justify-content: center;
		gap: 10px;
		max-width: 500px;
		-webkit-tap-highlight-color: transparent;
	}

	@media (hover: hover) {
		.link-style:hover {
			filter: brightness(1.15);
			box-shadow: 0px 0px 8px var(--main-bg-color);
		}

		.link-style:active {
			transform: scale(0.95);
		}
	}

	@media (hover: none) {
		.link-style:active {
			transform: scale(0.94);
			filter: brightness(0.85);
			box-shadow: 0px 0px 8px var(--main-bg-color);
		}
	}
</style>
