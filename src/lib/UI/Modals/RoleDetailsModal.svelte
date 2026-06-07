<script>
	import BaseModal from './BaseModal.svelte';
	import { bigDescriptions } from '$lib/stores';

	export let heroTag = 'mans';
	export let open = false;

	$: roleData = $bigDescriptions[heroTag] ?? $bigDescriptions.mans;
</script>

<BaseModal {open} on:close>
	<div class="header" slot="header">
		<svelte:component this={roleData.icon} class="details-icon" />

		<div>
			<h3>{roleData.name}</h3>
			<p class="subtitle">Деталі</p>
		</div>
	</div>

	<p class="description">{roleData.description}</p>
</BaseModal>

<style>
	.header {
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

	h3 {
		color: #fff;
		margin: 0;
		font-size: 2.3rem;
	}

	.subtitle {
		margin: 6px 0 0;
		color: #c7c7d3;
		font-size: 0.95rem;
	}

	.description {
		font-size: 1.4rem;
		line-height: 1.75;
		color: #e7e7e9;
	}

	@media (max-width: 650px) {
		.header {
			gap: 12px;
		}

		.header h3 {
			font-size: 1.75rem;
		}

		:global(.details-icon) {
			width: 44px;
			height: 44px;
		}

		.description {
			font-size: 1.35rem;
		}
	}

	@media (max-width: 500px) {
		:global(.details-icon) {
			width: 38px;
			height: 38px;
		}

		.header h3 {
			font-size: 21px;
		}

		.subtitle {
			margin-top: 2px;
		}
	}

	@media (max-width: 300px) {
		:global(.details-icon) {
			width: 25px;
			height: 25px;
		}
		.header {
			gap: 8px;
		}

		.header h3 {
			font-size: 20px;
		}

		.subtitle {
			display: none;
		}

		.description {
			font-size: 1.2rem;
		}
	}
</style>
