<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Sortable from 'sortablejs';
	import PlayerItem from './PlayerItem.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	export let onOpenRole = () => {};
	export let allowToManipulate = false;

	let people = page.state?.peopleList ?? [];
	let listElement;

	function toggleAlive(index) {
		people[index].alive = !people[index].alive;
		people = [...people];
	}

	onMount(() => {
		if (people.length === 0) {
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
				const reordered = [...people];
				const [movedItem] = reordered.splice(evt.oldIndex, 1);
				reordered.splice(evt.newIndex, 0, movedItem);

				people = reordered;
			}
		});

		people = people.reverse().map(({ id, uniqId }) => ({
			id,
			uniqId,
			alive: true
		}));
	});
</script>

{#if people.length > 0}
	<div class="players" bind:this={listElement}>
		{#each people as person, index (person.uniqId)}
			<div class="sort-item">
				<PlayerItem {person} {index} {toggleAlive} {onOpenRole} />
			</div>
		{/each}
	</div>
	{#if allowToManipulate}
		<SimpleLink href="/play">Почати гру</SimpleLink>
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
