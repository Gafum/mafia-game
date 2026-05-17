<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import Sortable from 'sortablejs';
	import PlayerItem from './PlayerItem.svelte';

	export let onOpenRole = () => {};

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
			handle: '.handle',
			animation: 200,
			ghostClass: 'sortable-ghost',
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
</style>
