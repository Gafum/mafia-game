<script>
	import { ChevronDown } from 'lucide-svelte';

	export let open = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section
	class="dropdown-block"
	class:active={open}
	on:click={() => {
		open = !open;
	}}
>
	<div class="top">
		<div class="left">
			<slot name="title" />
		</div>

		<div class="rotatable" class:rotate={open}>
			<ChevronDown size={18} color="#fff" />
		</div>
	</div>

	{#if open}
		<div class="content" on:click|stopPropagation>
			<slot />
		</div>
		<div class="bottom-padding" />
	{/if}
</section>

<style>
	.dropdown-block {
		background: #141414;
		border-radius: 14px;
		padding: 14px;
		cursor: pointer;
		box-shadow: 4px 4px 5px #0e0e0e30;

		transition: background 0.2s ease, transform 0.15s ease;
	}

	.dropdown-block:hover {
		background: #1a1a1a;
	}

	/* .dropdown-block:active {
		transform: scale(0.995);
	} */

	.dropdown-block.active {
		background: #181818;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 10px;

		font-size: 18px;
		color: #fff;
	}

	.content {
		margin-top: 14px;
		cursor: default;
	}

	.bottom-padding {
		width: 100%;
		height: 15px;
	}

	.rotatable {
		display: flex;
		align-items: center;
		justify-content: center;

		transition: transform 0.2s ease;
	}

	.rotate {
		transform: rotate(180deg);
	}
</style>
