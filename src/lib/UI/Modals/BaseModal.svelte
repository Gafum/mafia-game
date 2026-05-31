<script>
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';

	export let open = false;

	const dispatch = createEventDispatcher();

	function close() {
		dispatch('close');
	}

	$: if (typeof document !== 'undefined') {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function handleOverlayKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			close();
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if open}
	<div
		class="overlay"
		on:click={close}
		role="button"
		tabindex="0"
		on:keydown={handleOverlayKeydown}
		aria-label="Close modal"
	>
		<div class="panel" on:click|stopPropagation role="dialog" aria-modal="true">
			<button class="close" on:click={close} aria-label="Close modal">
				<X size="26" />
			</button>

			<header class="header">
				<slot name="header" />
			</header>

			<section class="content">
				<slot />
			</section>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		z-index: 50;
		animation: fadeInOverlay 220ms ease forwards;
	}

	.panel {
		position: relative;
		width: min(520px, 100%);
		background: #111;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 28px;
		padding: 32px 26px;
		color: #f7f7f7;
		max-height: 85vh;
		max-height: min(85vh, 85svh);
		max-height: min(max(400px, 85vh), 100vh);
		overflow-y: auto;
		animation: slideUpPanel 260ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.close {
		position: absolute;
		top: 24px;
		right: 24px;
		width: 42px;
		height: 42px;
		border: none;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		color: white;
		cursor: pointer;
		transition: background 0.2s;
	}

	@media (hover: hover) {
		.close:hover {
			background: rgba(255, 255, 255, 0.16);
		}
	}

	:global(.close svg) {
		transform: translateY(2.3px);
	}

	@media (max-width: 650px) {
		.overlay {
			align-items: flex-end;
			justify-content: flex-end;
			padding: 0;
		}

		.panel {
			width: 100vw;
			width: 100svw;
			max-width: 100vw;
			border-radius: 24px 24px 0 0;
			padding: 24px 18px 26px;
			margin: 0;
			min-height: 50vh;
			height: 50vh;
			height: 50vh;
			max-height: 100svh;
			align-self: flex-end;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			animation: slideUpMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		}

		.close {
			top: 24px;
			right: 24px;
		}
	}

	@media (max-height: 600px) {
		.panel {
			height: fit-content;
			max-height: 100vh;
		}
	}

	@media (max-width: 500px), (max-height: 700px) and (max-width: 650px) {
		.panel {
			top: 50%;
			min-height: 100%;
			height: 100%;
			min-height: 100vh;
			height: 100vh;
			min-height: 100svh;
			height: 100svh;
			min-height: 100dvh;
			height: 100dvh;
			max-height: 100lvh;
			max-height: 100dvh;
			animation: slideUpSmallMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
			border-radius: 0;
		}
	}

	@media (max-width: 300px) {
		.close {
			top: 15px;
		}
	}

	@keyframes fadeInOverlay {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUpPanel {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUpMobile {
		from {
			opacity: 0;
			transform: translate(-50%, 50%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0%);
		}
	}

	@keyframes slideUpSmallMobile {
		from {
			opacity: 0;
			transform: translate(-50%, 400%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
</style>
