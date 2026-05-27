<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import PlayerItem from './PlayerItem.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import { addKeyToObjects } from '$lib/functions/addKeyToObjects';
	import { Play, Plus } from 'lucide-svelte';
	import { allowToManipulate } from './hostStore.js';
	import { slide, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';

	export let peopleList = [];

	let visibleCount = 0;
	let listElement;

	let modalHeroTag = 'mans';
	let isModalOpen = false;

	function openRole(tag) {
		modalHeroTag = tag;
		isModalOpen = true;
	}

	function toggleAlive(index) {
		peopleList[index].alive = !peopleList[index].alive;
		peopleList = [...peopleList];
	}

	function handleRoleChange(index, newTag) {
		peopleList[index].tag = newTag;
		peopleList = [...peopleList];
	}

	function addPlayer() {
		const newPlayer = {
			tag: 'mans',
			alive: true,
			myIndex: `new_${Date.now()}_${Math.random()}`
		};
		peopleList = [...peopleList, newPlayer];
		visibleCount += 1;
	}

	function deletePlayer(index) {
		if (peopleList.length <= 1) return;
		peopleList.splice(index, 1);
		peopleList = [...peopleList];
		if (visibleCount > peopleList.length) {
			visibleCount = peopleList.length;
		}
	}

	function startLazyRender(chunkSize = 5) {
		visibleCount = 0;

		function nextChunk() {
			if (visibleCount >= peopleList.length) {
				visibleCount = peopleList.length;
				return;
			}
			visibleCount += chunkSize;
			requestAnimationFrame(nextChunk);
		}

		nextChunk();
	}

	onMount(async () => {
		if (peopleList.length === 0) {
			goto('/');
			return;
		}

		startLazyRender();

		await tick();

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
			fallbackOnBody: true,
			onEnd: (evt) => {
				if (evt.oldIndex === evt.newIndex) return;

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
			{#each peopleList.slice(0, visibleCount) as person, index (person.myIndex)}
				<div
					class="sort-item"
					animate:flip={{ duration: 200 }}
					in:fade={{ duration: 200 }}
					out:slide={{ duration: 200 }}
				>
					<PlayerItem
						{person}
						{index}
						{toggleAlive}
						{openRole}
						onDelete={deletePlayer}
						onRoleChange={(newTag) => handleRoleChange(index, newTag)}
					/>
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

<RoleDetailsModal
	open={isModalOpen}
	heroTag={modalHeroTag}
	on:close={() => (isModalOpen = false)}
/>

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
		-webkit-tap-highlight-color: transparent;
		transition: transform 0.1s ease-out, background 0.2s;
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

	.add-player-btn:active {
		transform: scale(0.96);
		background: #1a1a1a;
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
