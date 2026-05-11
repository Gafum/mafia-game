<script>
	export let onOpenRole = () => {};

	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import PlayerItem from './PlayerItem.svelte';

	let people = page.state?.peopleList ?? [];

	let showPlayers = true;

	function toggleAlive(index) {
		people[index].alive = !people[index].alive;
		console.log(people);
	}

	onMount(() => {
		if (people.length > 0) {
			people = people.reverse().map(({ id, uniqId }) => ({
				id,
				uniqId,
				alive: true
			}));
		} else {
			goto('/');
		}
	});
</script>

{#if people.length > 0}
	<DropdownBlock open={showPlayers}>
		<h2 slot="title" class="host-headline">Гравці</h2>

		<div class="players">
			{#each people as person, index (person.uniqId)}
				<PlayerItem {person} {index} {toggleAlive} {onOpenRole} />
			{/each}
		</div>
	</DropdownBlock>
{/if}

<style>
	.players {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
