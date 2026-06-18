<!-- src/routes/custom-cards/CardList.svelte -->
<script>
	import { customCardsStore } from '$lib/stores';
	import CreatedCard from './CreatedCard.svelte';

	export let onEdit;
	export let onDelete;
</script>

<section class="cards-section">
	<h2 class="section-title text-white">Мої карти ({$customCardsStore.length})</h2>

	{#if $customCardsStore.length === 0}
		<div class="empty-state animate-fade">
			<p class="text-white">Колода порожня.</p>
			<p class="hint">Створіть першу карту за допомогою форми.</p>
		</div>
	{:else}
		<div class="cards-layout">
			{#each $customCardsStore as card, idx (idx)}
				<CreatedCard {card} {idx} {onEdit} {onDelete} />
			{/each}
		</div>
	{/if}
</section>

<style>
	.text-white {
		color: #ffffff !important;
	}
	.cards-section {
		border: none;
		background: transparent;
		padding: 0;
		width: 100%;
	}
	.section-title {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 16px;
	}
	.cards-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}
	.empty-state {
		text-align: center;
		padding: 30px 16px;
		color: #52525b;
		font-size: 0.85rem;
		border: 1px dashed #232326;
		border-radius: 12px;
	}
	.hint {
		font-size: 0.75rem;
		color: #3f3f46;
		margin-top: 2px;
	}
	.animate-fade {
		animation: fadeIn 0.2s ease-out;
	}
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: translateY(0); }
	}
	@media (max-width: 600px) {
		.section-title {
			width: 100%;
			text-align: center;
		}
	}
	@media (max-width: 300px) {
		.cards-layout {
			grid-template-columns: 1fr;
		}
	}
</style>
