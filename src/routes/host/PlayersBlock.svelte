<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import PlayerItem from './PlayerItem.svelte';

	export let onOpenRole = () => {};

	let people = page.state?.peopleList ?? [];

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
	<div class="players">
		{#each people as person, index (person.uniqId)}
			<PlayerItem {person} {index} {toggleAlive} {onOpenRole} />
		{/each}
	</div>
{/if}

<style>
	.players {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
