<script>
	/** @type {import('./$types').PageData} */
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { createArray } from '$lib/functions/createArray';
	import { cardRules } from '$lib/stores';
	import { cardRulesConst, cardList } from '$lib/data';
	import EndScreen from './EndScreen.svelte';
	import Card from './Card.svelte';

	let hostPeopleList = page.state?.peopleList ?? [];
	let peopleList = [...cardList];

	let visiblePeople = [];

	let showingElement = 0;
	let maxVisibleCards = 2;

	function changeData() {
		try {
			if (showingElement == 0) {
				return;
			}
			if (showingElement < maxVisibleCards) {
				maxVisibleCards--;
			}
			visiblePeople = peopleList.slice(showingElement - maxVisibleCards, showingElement + 1);
			showingElement--;
		} catch (e) {
			console.log(e);
			showingElement = 0;
		}
	}

	onMount(() => {
		let data = { ...cardRulesConst };

		try {
			data = { ...cardRulesConst, ...$cardRules };
			if (!data) data = cardRulesConst;
		} catch (e) {
			console.log(e);
		}

		if (hostPeopleList && hostPeopleList.length > 0) {
			peopleList = hostPeopleList;
		} else {
			peopleList = createArray(data).map((id, index) => {
				return { id, uniqId: index };
			});
		}

		visiblePeople = peopleList.slice(peopleList.length - maxVisibleCards, peopleList.length);
		showingElement = peopleList.length - 1; // index of last element
	});
</script>

<div class="center">
	<div class="container-inner">
		<EndScreen {peopleList} />
		{#each visiblePeople as person (person.uniqId)}
			<Card {...person} {changeData} {showingElement} />
		{/each}
	</div>
</div>

<style>
	.center {
		height: 100%;
		height: 100dvh;
		width: 100vw;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		background-image: url('/assets/background.jpg');
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
	}
	.container-inner {
		position: relative;
	}
</style>
