<script>
	import { allowToManipulate } from './hostStore.js';

	import { CircleQuestionMark, Eye, EyeOff, Trash2, GripVertical } from 'lucide-svelte';

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

	<button on:click={() => onOpenRole(person.tag)}>
		<CircleQuestionMark size={20} />
	</button>

	<button on:click={() => onToggleAlive(index)}>
		{#if person.alive}
			<Eye size={20} />
		{:else}
			<EyeOff size={20} />
		{/if}
	</button>

	<div class="handle">
		<GripVertical size={20} />
	</div>
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
	}

	@media (hover: hover) {
		.handle:hover {
			opacity: 0.4;
		}
	}

	.handle:active {
		opacity: 0.4;
	}
</style>
