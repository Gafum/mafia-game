<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import PlayerItem from './PlayerItem.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import { addKeyToObjects } from '$lib/functions/addKeyToObjects';
	import { Play, Plus } from 'lucide-svelte';
	import { allowToManipulate } from './hostStore.js';
	import { slide, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let onOpenRole = () => {};

	let peopleList = (page.state?.peopleList ?? []).map((element, i) => ({
		myIndex: element.myIndex ?? `init_${i}`,
		...element,
		alive: element.hasOwnProperty('alive') ? element.alive : true
	}));
	let listElement;

	function toggleAlive(index) {
		peopleList[index].alive = !Boolean(peopleList[index].alive);
		peopleList = [...peopleList];
	}

	function addPlayer() {
		const newPlayer = {
			tag: 'mans',
			alive: true,
			myIndex: `new_${Date.now()}_${Math.random()}`
		};
		peopleList = [...peopleList, newPlayer];
	}

	function deletePlayer(index) {
		if (peopleList.length <= 1) {
			return;
		}

		peopleList.splice(index, 1);
		peopleList = [...peopleList];
	}

	onMount(async () => {
		allowToManipulate.update(() => false);
		if (peopleList.length === 0) {
			goto('/');
			return;
		}

		const Sortable = (await import('sortablejs')).default;

		Sortable.create(listElement, {
			touchStartThreshold: 3,
			delay: 200,
			delayOnTouchOnly: true,
			handle: '.handle',
			animation: 200,
			filter: '.ignore-drag',
			preventOnFilter: false,
			ghostClass: 'sortable-ghost',
			forceFallback: true,
			fallbackClass: 'sortable-drag',
			onEnd: (evt) => {
				const reordered = [...peopleList];
				const [movedItem] = reordered.splice(evt.oldIndex, 1);
				reordered.splice(evt.newIndex, 0, movedItem);

				peopleList = reordered;
			}
		});
	});

	const goToModifiedPlay = () => {
		goto('/play', {
			state: {
				peopleList: addKeyToObjects(peopleList.reverse(), 'myIndex')
			}
		});
	};
</script>

{#if peopleList.length > 0}
	<div class="players-container">
		<div class="players" bind:this={listElement}>
			{#each peopleList as person, index (person.myIndex)}
				<div
					class="sort-item"
					animate:flip={{ duration: 200 }}
					in:fade|local={{ duration: 200 }}
					out:slide|local={{ duration: 200 }}
				>
					<PlayerItem bind:person {index} {toggleAlive} {onOpenRole} onDelete={deletePlayer} />
				</div>
			{/each}
		</div>

		{#if $allowToManipulate}
			<button class="add-player-btn" on:click={addPlayer}>
				<Plus size={20} color="#fff" />
				<span> Новий герой </span>
			</button>
		{/if}
	</div>

	{#if $allowToManipulate}
		<SimpleLink href="/play" actionCallback={goToModifiedPlay}>
			<Play size={20} color="#fff" class="mobile-hidden-icon" />Почати гру
		</SimpleLink>
	{/if}
{/if}

<style>
	.players-container {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	.players {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.add-player-btn {
		background: #242424;
		border: 2px dashed #444;
		border-radius: 12px;
		padding: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: pointer;

		transition: background 0.2s, border-color 0.2s;
	}

	.add-player-btn > span {
		color: white;
		font-size: 18px;
	}

	@media (hover: hover) {
		.add-player-btn:hover {
			background: #2a2a2a;
			border-color: #666;
		}
	}

	:global(.sortable-ghost) {
		opacity: 0.3;
		border-radius: 12px;
		box-shadow: none;
	}

	:global(.sortable-drag) {
		opacity: 0.3;
		border-radius: 12px;
		scale: 0.92;
	}

	@media (max-width: 300px) {
		.add-player-btn > span {
			color: white;
			font-size: 15px;
		}
	}
</style>
