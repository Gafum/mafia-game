<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';

	import PlayerItem from './PlayerItem.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';
	import RolePickerModal from '$lib/UI/Modals/RolePickerModal.svelte';

	import { allowToManipulate } from './hostStore.js';
	import { addKeyToObjects } from '$lib/functions/addKeyToObjects';
	import { Plus, Play } from 'lucide-svelte';

	import { slide, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	export let peopleList = [];

	let listElement;
	let sortableInstance;
	let displayedPeople = [];

	let roleModalOpen = false;
	let roleModalTag = 'mans';

	let rolePickerOpen = false;
	let selectedPlayerIndex = -1;

	function loadPeopleThrottled() {
		if (peopleList.length <= 9) {
			displayedPeople = peopleList;
			return;
		}

		displayedPeople = peopleList.slice(0, 9);

		requestAnimationFrame(() => {
			setTimeout(() => {
				displayedPeople = peopleList;
			}, 40);
		});
	}

	$: if (peopleList) {
		const diff = Math.abs(displayedPeople.length - peopleList.length);

		if (displayedPeople.length === peopleList.length || diff === 1) {
			displayedPeople = peopleList;
		} else {
			loadPeopleThrottled();
		}
	}

	function openRole(tag) {
		roleModalTag = tag;
		roleModalOpen = true;
	}

	function openRolePicker(index) {
		selectedPlayerIndex = index;
		rolePickerOpen = true;
	}

	function handleRoleSelect(event) {
		const tag = event.detail;
		peopleList[selectedPlayerIndex].tag = tag;
		peopleList = peopleList;
		rolePickerOpen = false;
	}

	function toggleAlive(index) {
		peopleList[index].alive = !peopleList[index].alive;
		peopleList = peopleList;
	}

	function deletePlayer(index) {
		if (peopleList.length <= 1) return;
		peopleList.splice(index, 1);
		peopleList = peopleList;
	}

	function addPlayer() {
		peopleList = [
			...peopleList,
			{
				tag: 'mans',
				alive: true,
				myIndex: crypto.randomUUID()
			}
		];
	}

	const goToModifiedPlay = () => {
		goto('/play', {
			state: {
				peopleList: addKeyToObjects([...peopleList].reverse(), 'myIndex')
			}
		});
	};

	onMount(async () => {
		loadPeopleThrottled();

		const Sortable = (await import('sortablejs')).default;

		sortableInstance = Sortable.create(listElement, {
			handle: '.handle',
			delay: 150,
			delayOnTouchOnly: true,
			touchStartThreshold: 3,
			animation: 150,

			async onEnd(evt) {
				if (evt.oldIndex === evt.newIndex) return;

				const item = peopleList[evt.oldIndex];

				peopleList.splice(evt.oldIndex, 1);
				peopleList.splice(evt.newIndex, 0, item);

				peopleList = peopleList;
			}
		});

		return () => {
			if (sortableInstance) sortableInstance.destroy();
		};
	});
</script>

<div class="players" bind:this={listElement} autocomplete="off" data-lpignore="true">
	{#each displayedPeople as person, index (person.myIndex)}
		<div
			animate:flip={{ duration: 200 }}
			in:fade={{ duration: 200 }}
			out:slide={{ duration: 200 }}
			class="playerAnimation"
		>
			<PlayerItem
				{person}
				{index}
				onDelete={deletePlayer}
				onToggleAlive={toggleAlive}
				onOpenRole={openRole}
				onChangeRole={openRolePicker}
			/>
		</div>
	{/each}
</div>

{#if $allowToManipulate}
	<button class="add-player-btn" on:click={addPlayer}>
		<Plus size={20} />
		<span>Новий герой</span>
	</button>

	<SimpleLink href="/play" actionCallback={goToModifiedPlay}>
		<Play size={20} />
		Почати гру
	</SimpleLink>
{/if}

<RoleDetailsModal
	open={roleModalOpen}
	heroTag={roleModalTag}
	on:close={() => (roleModalOpen = false)}
/>

<RolePickerModal
	open={rolePickerOpen}
	on:close={() => (rolePickerOpen = false)}
	on:select={handleRoleSelect}
/>

<style>
	.players {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.add-player-btn {
		background: #242424;
		border: 2px dashed #444;
		border-radius: 10px;
		padding: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition:
			transform 0.1s ease-out,
			background 0.2s;
		width: 100%;
		margin-top: 20px;
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
