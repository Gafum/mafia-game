<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Sortable from 'sortablejs';
	import PlayerItem from './PlayerItem.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import { addKeyToObjects } from '$lib/functions/addKeyToObjects';

	export let onOpenRole = () => {};
	export let allowToManipulate;

	let peopleList = page.state?.peopleList ?? [];
	let listElement;

	function toggleAlive(index) {
		peopleList[index].alive = !Boolean(peopleList[index].alive);
		peopleList = [...peopleList];
	}

	onMount(() => {
		if (peopleList.length === 0) {
			goto('/');
			return;
		}

		Sortable.create(listElement, {
			touchStartThreshold: 3,
			delay: 200,
			delayOnTouchOnly: true,
			handle: '.handle',
			animation: 200,
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

		peopleList = peopleList.map((element) => ({
			...element,
			alive: true
		}));
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
	<div class="players" bind:this={listElement}>
		{#each peopleList as person, index (person.myIndex)}
			<div class="sort-item">
				<PlayerItem {person} {index} {toggleAlive} {onOpenRole} />
			</div>
		{/each}
	</div>
	{#if $allowToManipulate}
		<SimpleLink href="/play" actionCallback={goToModifiedPlay}>Почати гру</SimpleLink>
	{/if}
{/if}

<style>
	.players {
		display: flex;
		flex-direction: column;
		gap: 10px;
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
</style>
