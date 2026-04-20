<script>
	import { Shuffle, Edit3 } from 'lucide-svelte';

	export let isEditing = false;
	export let onRandom;
	export let onToggleEdit;
</script>

<div class="random-controls">
	<button class="random-btn" on:click={onRandom}>
		<Shuffle size={20} />
		<span>Випадково</span>
	</button>

	{#if !isEditing}
		<button class="edit-btn" on:click={onToggleEdit}>
			<Edit3 size={20} />
			<span>Редагувати</span>
		</button>
	{/if}
</div>

<style>
	.random-controls {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}

	.random-btn,
	.edit-btn {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 10px 16px;
		background: linear-gradient(135deg, #8b0000, #dc143c);
		color: white;
		border: none;
		border-radius: 8px;
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.random-btn:hover,
	.edit-btn:hover {
		background: linear-gradient(135deg, #a00000, #ff0000);
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
	}

	.random-btn:active,
	.edit-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}
</style>
