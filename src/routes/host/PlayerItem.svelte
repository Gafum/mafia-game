<script>
	// import { bigDescriptionList } from '$lib/data';
	// import { allowToManipulate } from './hostStore.js';
	// import PlayerActions from './PlayerActions.svelte';
	// import { ChevronDown } from 'lucide-svelte';

	export let person;
	export let index;

	// export let onDelete;
	// export let onToggleAlive;
	// export let onOpenRole;
	// export let onChangeRole;

	// $: role = bigDescriptionList[person.tag];
</script>

<!-- <div class="player" class:dead={!person.alive} class:manipulate={$allowToManipulate}>
	<div class="left">
		<div class="index">
			{index + 1}
		</div>

		<div class="role">
			<svelte:component this={role.icon} size={18} class="mobile-hidden-icon" />

			<button
				class="role-name"
				disabled={!Boolean($allowToManipulate)}
				on:click={() => onChangeRole(index)}
			>
				{role.name}
				{#if $allowToManipulate}
					<ChevronDown size="17" />
				{/if}
			</button>
		</div>
	</div>

	<PlayerActions {person} {index} {onDelete} {onToggleAlive} {onOpenRole} />
</div> -->

<div class="player">
	{index} => {person.tag}
</div>

<style>
	.player {
		border-radius: 12px;
		padding: 12px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;

		will-change: transform, opacity;

		background: #1c1c1c;
		box-shadow: 4px 4px 5px #0e0e0e60;
	}

	.player:nth-child(even) {
		background: #1b1b1baa;
		box-shadow: 4px 4px 5px #0d0d0d60;
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

	.role {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.role-name {
		display: inline;
		color: white;
		font-size: 17px;
		cursor: initial;
	}

	.player.manipulate .role-name {
		background: #242424;
		color: white;
		border: 1px solid #333;
		padding: 6px 10px;
		border-radius: 8px;
		font-size: 16px;
		cursor: pointer;
		outline: none;
		max-width: 180px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		width: 130px;
	}

	@media (max-width: 420px) {
		.player.manipulate {
			flex-direction: column;
			align-items: stretch;
		}
	}

	@media (max-width: 320px) {
		.player {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
