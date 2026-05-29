<script>
	import { ChevronDown } from 'lucide-svelte';

	export let open = false;

	function handleSectionClick() {
		if (!open) {
			open = true;
		}
	}

	function handleTopClick(event) {
		if (open) {
			event.stopPropagation();
			open = false;
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="dropdown-block" class:active={open} on:click={handleSectionClick}>
	<div class="top" on:click={handleTopClick}>
		<div class="left">
			<slot name="title" />
		</div>

		<div class="rotatable" class:rotate={open}>
			<ChevronDown size={18} color="#fff" />
		</div>
	</div>

	<div class="content-wrapper" class:hidden={!open} on:click|stopPropagation>
		{#if open}
			<div class="content">
				<slot />
			</div>
			<div class="bottom-padding" />
		{/if}
	</div>
</section>

<style>
	.dropdown-block {
		background: #141414;
		border-radius: 14px;
		padding: 0;
		cursor: pointer;
		box-shadow: 4px 4px 5px #0e0e0e30;
		transition: background 0.2s ease, transform 0.15s ease;
		overflow: hidden;
	}

	.dropdown-block.active {
		background: #181818;
	}

	@media (hover: hover) {
		.dropdown-block:not(.active):hover {
			background: #1c1c1c;
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		padding: 14px;
		user-select: none;
		background: transparent;
	}

	.content-wrapper {
		padding: 0 14px;
		background: transparent;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 18px;
		color: #fff;
	}

	.hidden {
		display: none !important;
	}

	.content {
		cursor: default;
	}

	.bottom-padding {
		width: 100%;
		height: 20px;
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
