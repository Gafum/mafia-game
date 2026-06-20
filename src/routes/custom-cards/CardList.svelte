<script>
	import { customCardsStore } from '$lib/stores';
	import CreatedCard from './CreatedCard.svelte';
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte';
	import { TriangleAlert } from 'lucide-svelte';

	export let onEdit;
	export let deleteCard;

	let deleteModalOpen = false;
	let cardToDeleteIndex = null;

	function confirmDelete(index) {
		cardToDeleteIndex = index;
		deleteModalOpen = true;
	}
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
				<CreatedCard {card} {idx} {onEdit} onDelete={confirmDelete} />
			{/each}
		</div>
	{/if}
</section>

<BaseModal open={deleteModalOpen} on:close={() => (deleteModalOpen = false)}>
	<div class="modal-header-slot" slot="header">
		<TriangleAlert class="details-icon" color="#ef4444" />
		<div>
			<h3 class="text-white">Видалення карти</h3>
			<p class="subtitle">Дія є незворотною</p>
		</div>
	</div>
	<div class="modal-body-content">
		<p class="description text-white">Ви впевнені, що хочете видалити цю карту з колоди?</p>
		<div class="modal-actions-row">
			<button
				class="modal-btn confirm"
				on:click={() => {
					deleteCard(cardToDeleteIndex);
					deleteModalOpen = false;
				}}
			>
				Видалити
			</button>
			<button class="modal-btn cancel" on:click={() => (deleteModalOpen = false)}>Скасувати</button>
		</div>
	</div>
</BaseModal>

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

	.modal-header-slot {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.modal-header-slot h3 {
		margin: 0;
		font-size: 1.2rem;
	}
	.subtitle {
		margin: 0;
		font-size: 0.8rem;
		color: #71717a;
	}
	.modal-body-content {
		padding: 25px 0 0;
	}
	.modal-actions-row {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.modal-btn {
		flex: 1;
		padding: 8px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		font-size: 0.9rem;
	}
	.modal-btn.confirm {
		background: #ef4444;
		border: none;
		color: white;
	}
	.modal-btn.cancel {
		background: #232326;
		border: none;
		color: #a1a1aa;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
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
