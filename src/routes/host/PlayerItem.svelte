<script>
	import { bigDescriptions } from '$lib/stores';
	import { allowToManipulate } from './hostStore.js';
	import PlayerActions from './PlayerActions.svelte';
	import { ChevronDown, User } from 'lucide-svelte';

	export let person;
	export let index;

	export let onDelete;
	export let onToggleAlive;
	export let onOpenRole;
	export let onChangeRole;

	$: role = $bigDescriptions[person.tag] || { name: person.tag, icon: User };
</script>

<div class="player" class:dead={!person.alive} class:manipulate={$allowToManipulate}>
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
				<span class="role-name-text">{role.name}</span>
				{#if $allowToManipulate}
					<ChevronDown size="17" />
				{/if}
			</button>
		</div>
	</div>

	<PlayerActions {person} {index} {onDelete} {onToggleAlive} {onOpenRole} />
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

	:global(.player) {
		content-visibility: auto;

		contain-intrinsic-size: 77px;
	}

	:global(.playerAnimation:nth-child(even) .player) {
		background: #1b1b1b88;
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
		cursor: initial;
	}

	.role-name-text {
		color: white;
		font-size: 17px;
		text-align: left;
	}

	.player.manipulate .role-name {
		background: #242424;
		border: 1px solid #333;
		padding: 6px 10px;
		border-radius: 8px;
		cursor: pointer;
		outline: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 5px;
		width: 130px;
	}

	.player.manipulate .role-name-text {
		font-size: 16px;
		max-width: 110px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: keep-all;
		white-space: nowrap;
	}

	@media (max-width: 420px) {
		.player.manipulate {
			flex-direction: column;
			align-items: stretch;
		}

		:global(.player) {
			contain-intrinsic-size: 123px;
		}
	}

	@media (max-width: 320px) {
		.player {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
