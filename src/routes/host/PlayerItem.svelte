<script>
	import { cardList, bigDescriptionList } from '$lib/data';
	import { CircleQuestionMark, Eye, EyeOff, GripVertical } from 'lucide-svelte';

	export let person;
	export let index;

	export let toggleAlive = () => {};
	export let onOpenRole = () => {};

	$: roleTag = cardList.find((c) => c.id == person.id)?.tag ?? 'mans';

	$: roleData = bigDescriptionList[roleTag];
</script>

<div class="player" class:dead={!person.alive}>
	<div class="left">
		<div class="index">{index + 1}</div>

		<svelte:component this={roleData.icon} size={20} color="#fff" class="mobile-hidden-icon" />

		<span>{roleData.name}</span>
	</div>

	<div class="actions">
		<button on:click|stopPropagation={() => onOpenRole(roleTag)}>
			<CircleQuestionMark size={21} color="#fff" />
		</button>

		<button on:click|stopPropagation={() => toggleAlive(index)}>
			{#if person.alive}
				<Eye size={21} color="#fff" />
			{:else}
				<EyeOff size={21} color="#fff" />
			{/if}
		</button>

		<!-- <div class="drag">
			<GripVertical size={20} color="#888" />
		</div> -->
	</div>
</div>

<style>
	.player {
		background: #1c1c1c;
		border-radius: 12px;
		padding: 12px;

		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 12px;

		transition: 0.2s;
		box-shadow: 4px 4px 5px #0e0e0e60;
	}

	.player.dead {
		opacity: 0.45;
	}

	.left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.index {
		color: #999;
		font-size: 14px;
		min-width: 15px;
	}

	span {
		color: white;
		font-size: 17px;
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
	}

	.drag {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-inline: 2px;
	}

	@media (max-width: 340px) {
		.player {
			flex-direction: column;
			align-items: stretch;
		}

		.actions {
			justify-content: flex-end;
		}
	}
</style>
