<script>
	import { bigDescriptionList } from '$lib/data';
	import { CircleQuestionMark, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-svelte';
	import { allowToManipulate } from './hostStore.js';

	export let person;
	export let index;

	export let toggleAlive = () => {};
	export let openRole = () => {};
	export let onDelete = () => {};
	export let onRoleChange = (tag) => {};

	$: roleTag = person.tag;
	$: roleData = bigDescriptionList[roleTag];

	const allRoles = Object.keys(bigDescriptionList);
</script>

<div
	class="player"
	class:even={index % 2 === 0}
	class:dead={!person.alive}
	class:manipulate={$allowToManipulate}
>
	<div class="left">
		<div class="index">{index + 1}</div>

		<svelte:component this={roleData?.icon} size={20} color="#fff" class="mobile-hidden-icon" />

		<select
			value={person.tag}
			on:change={(e) => onRoleChange(e.target.value)}
			class="role-select ignore-drag"
		>
			{#each allRoles as roleKey}
				<option value={roleKey}>
					{bigDescriptionList[roleKey]?.name || roleKey}
				</option>
			{/each}
		</select>

		<span class="role-name">{roleData?.name}</span>
	</div>

	<div class="actions">
		{#if $allowToManipulate}
			<button class="delete-btn" on:click|stopPropagation={() => onDelete(index)}>
				<Trash2 size={21} color="#ff4a4a" />
			</button>
		{/if}

		<button on:click|stopPropagation={() => openRole(roleTag)}>
			<CircleQuestionMark size={21} color="#fff" />
		</button>

		<button on:click|stopPropagation={() => toggleAlive(index)}>
			{#if person.alive}
				<Eye size={21} color="#fff" />
			{:else}
				<EyeOff size={21} color="#fff" />
			{/if}
		</button>

		<div class="drag handle">
			<GripVertical size={20} color="#888" />
		</div>
	</div>
</div>

<style>
	.player {
		background: #1b1b1baa;
		border-radius: 12px;
		padding: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;
		box-shadow: 4px 4px 5px #0d0d0d60;
		will-change: transform, opacity;
	}

	.player.even {
		background: #1c1c1c;
		box-shadow: 4px 4px 5px #0e0e0e60;
	}

	.player.dead {
		opacity: 0.45;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-grow: 1;
	}

	.index {
		color: #999;
		font-size: 14px;
		min-width: 15px;
	}

	.role-select {
		display: none;
		background: #242424;
		color: white;
		border: 1px solid #333;
		padding: 6px 10px;
		border-radius: 8px;
		font-size: 16px;
		cursor: pointer;
		outline: none;
		max-width: 180px;
	}

	.role-name {
		display: inline;
		color: white;
		font-size: 17px;
	}

	.player.manipulate .role-select {
		display: inline-block;
	}

	.player.manipulate .role-name {
		display: none;
	}

	:global(.sortable-drag .role-select) {
		display: none !important;
	}

	:global(.sortable-drag .role-name) {
		display: inline !important;
	}

	.role-select > option {
		color: white;
		font-size: 16px;
	}

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
		transition: filter 0.2s;
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
		.player.manipulate {
			flex-direction: column;
			align-items: stretch;
		}
		.actions {
			justify-content: flex-end;
		}
	}

	@media (max-width: 320px) {
		.player {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
