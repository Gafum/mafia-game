<script>
	import { allowToManipulate } from './hostStore.js';

	import { Eye, EyeOff, Trash2 } from 'lucide-svelte';

	export let person;

	export let onDelete;
	export let onToggleAlive;
	export let onOpenRole;
	export let index;
</script>

<div class="actions">
	{#if $allowToManipulate}
		<button class="delete-btn" on:click={() => onDelete(index)}>
			<Trash2 size={20} style="stroke: #ff4a4a;" />
		</button>
	{/if}

	<button on:click={() => onOpenRole(person.tag)} class="text-btn"> ? </button>

	<button on:click={() => onToggleAlive(index)}>
		{#if person.alive}
			<Eye size={20} />
		{:else}
			<EyeOff size={20} />
		{/if}
	</button>

	<div class="handle text-btn">≡</div>
</div>

<style>
	.actions {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	button {
		background: #242424;
		border: none;
		width: 38px;
		height: 38px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.1s ease-out;
	}

	.delete-btn {
		background: #2a1a1a;
	}

	.handle {
		cursor: grab;
		padding: 10px;
		display: flex;
		align-items: center;
		font-weight: 100;
	}

	.text-btn {
		color: white;
		font-size: 20px;
	}

	@media (hover: hover) {
		.handle:hover {
			opacity: 0.4;
		}
	}

	.handle:active {
		opacity: 0.4;
	}

	@media (max-width: 420px) {
		.actions {
			justify-content: flex-end;
		}
	}
</style>
