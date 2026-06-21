<script>
	import { Pen, Trash2 } from 'lucide-svelte';
	import * as Icons from 'lucide-svelte';
	import { bigDescriptions } from '$lib/stores';

	export let card;
	export let idx;
	export let onEdit;
	export let onDelete;

	$: currentRole = $bigDescriptions[card.tag] || {};
</script>

<div class="game-card-item animate-fade">
	<div class="real-game-card">
		{#if card.myImg && card.myImg.startsWith('data:')}
			<div class="card-img-wrapper">
				<img src={card.myImg} alt="Card graphic" class="card-main-img" />
			</div>
		{:else}
			<div class="card-graphic-fallback">
				<svelte:component this={Icons[currentRole.icon] || Icons.User} size={42} color="#111" />
			</div>
		{/if}
		<div class="card-text-content">
			<p class="game-phrase">{card.description}</p>
		</div>
	</div>

	<div class="card-meta-panel">
		<div class="meta-info">
			<span class="role-indicator-tag">
				{currentRole.name || card.tag}
			</span>
		</div>
		<div class="meta-actions">
			<button class="action-icon-btn edit" on:click={() => onEdit(idx)} aria-label="Редагувати">
				<Pen size={14} />
			</button>
			<button class="action-icon-btn delete" on:click={() => onDelete(idx)} aria-label="Видалити">
				<Trash2 size={14} />
			</button>
		</div>
	</div>
</div>

<style>
	.game-card-item {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		border: 1px solid #232326;
	}
	.real-game-card {
		background: #ffffff;
		height: 205px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 12px;
		position: relative;
	}
	.card-img-wrapper {
		width: 100%;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.card-main-img {
		border-radius: 8px;
		height: 100%;
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}
	.card-graphic-fallback {
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
	.card-text-content {
		width: 100%;
		text-align: center;
		margin-top: auto;
	}
	.game-phrase {
		color: #111111 !important;
		font-size: 0.96rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
		word-break: break-word;
	}
	.card-meta-panel {
		background: #161619;
		padding: 8px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #232326;
		gap: 4px;
	}
	.role-indicator-tag {
		background: #2f2f33;
		color: #e4e4e7;
		padding: 3px 6px;
		border-radius: 4px;
		font-size: 1rem;
		font-weight: 600;
		display: inline-block;
		max-width: 90px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.meta-actions {
		display: flex;
		gap: 4px;
	}
	.action-icon-btn {
		background: #232326;
		border: none;
		color: #a1a1aa;
		width: 26px;
		height: 26px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}
	.action-icon-btn:hover {
		color: #ffffff;
		background: #333336;
	}
	.animate-fade {
		animation: fadeIn 0.2s ease-out;
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
</style>
