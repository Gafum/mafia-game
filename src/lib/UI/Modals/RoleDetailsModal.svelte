<script>
	import { createEventDispatcher } from 'svelte';
	import { X } from 'lucide-svelte';
	import { bigDescriptionList } from '$lib/data';

	export let heroTag = 'mans';
	export let open = false;

	const dispatch = createEventDispatcher();

	$: roleData = bigDescriptionList[heroTag] ?? bigDescriptionList.mans;

	function close() {
		dispatch('close');
	}

	function handleOverlayKeydown(event) {
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
			event.preventDefault();
			close();
		}
	}
</script>

{#if open}
	<div
		class="details-overlay"
		on:click={close}
		role="button"
		tabindex="0"
		on:keydown={handleOverlayKeydown}
		aria-label="Close role details overlay"
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<div
			class="details-panel"
			on:click|stopPropagation
			role="dialog"
			aria-modal="true"
			tabindex="-1"
		>
			<button
				class="details-close"
				type="button"
				on:click|stopPropagation={close}
				aria-label="Close details"
			>
				<X color="#fff" size="26" />
			</button>
			<div class="details-header">
				<svelte:component this={roleData.icon} class="details-icon" color="#fff" />
				<div>
					<h3>{roleData.name}</h3>
					<p class="details-subtitle">Деталі</p>
				</div>
			</div>
			<p class="details-description">{roleData.description}</p>
		</div>
	</div>
{/if}

<style>
	.details-overlay {
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
		border-radius: 10px;
	}

	.details-panel {
		position: relative;
		width: min(520px, 100%);
		background-color: #111;
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 24px 90px rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(18px);
		border-radius: 28px;
		padding: 32px 26px 30px;
		color: #f7f7f7;
		overflow-y: auto;
		max-height: min(85vh, calc(100vh - 80px));
		max-height: min(85svh, calc(100svh - 80px));
		transform: translateY(18px);
		opacity: 0;
		animation: slideUpPanel 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	.details-close {
		position: absolute;
		top: 32px;
		right: 32px;
		width: 42px;
		height: 42px;
		border: none;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		color: #f7f7f7;
		cursor: pointer;
		font-size: 18px;
		line-height: 1;
		transition: background 0.2s ease;
	}
	@media (hover: hover) {
		.details-close:hover {
			background: rgba(255, 255, 255, 0.16);
		}
	}

	:global(.details-close svg) {
		transform: translateY(1px);
	}

	.details-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 18px;
	}

	:global(.details-icon) {
		width: 54px;
		height: 54px;
		color: #f8d76d;
		flex-shrink: 0;
	}

	.details-header h3 {
		margin: 0;
		font-size: 2.3rem;
		letter-spacing: 0.01em;
		color: #ffffff;
	}

	.details-subtitle {
		margin: 6px 0 0;
		color: #c7c7d3;
		font-size: 0.95rem;
	}

	.details-description {
		margin: 0;
		font-size: 1.4rem;
		line-height: 1.75;
		color: #e7e7e9;
	}

	@media (max-width: 650px) {
		.details-overlay {
			align-items: flex-end;
			justify-content: flex-end;
			padding: 0;
		}

		.details-panel {
			width: 100vw;
			width: 100svw;
			max-width: 100vw;
			border-radius: 24px 24px 0 0;
			padding: 24px 18px 26px;
			margin: 0;
			min-height: 50vh;
			align-self: flex-end;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			animation: slideUpMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		}

		.details-close {
			top: 24px;
			right: 24px;
		}

		.details-header {
			gap: 12px;
		}

		.details-header h3 {
			font-size: 1.75rem;
		}
	}

	@media (max-width: 500px) {
		:global(.details-icon) {
			width: 38px;
			height: 38px;
		}

		.details-header h3 {
			font-size: 21px;
		}

		.details-subtitle {
			margin-top: 2px;
		}

		.details-panel {
			top: 50%;
			min-height: 100%;
			height: 100%;
			min-height: 100vh;
			height: 100vh;
			min-height: 100svh;
			height: 100svh;
			min-height: 100dvh;
			height: 100dvh;
			animation: slideUpSmallMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
			border-radius: 0;
		}
	}

	@media (max-width: 300px) {
		:global(.details-icon) {
			width: 25px;
			height: 25px;
		}
		.details-header {
			gap: 8px;
		}

		.details-header h3 {
			font-size: 20px;
		}

		.details-subtitle {
			display: none;
		}

		.details-close {
			top: 15px;
		}

		.details-description {
			font-size: 1.3rem;
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
