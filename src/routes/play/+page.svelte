<script>
	/** @type {import('./$types').PageData} */
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { createArray } from '$lib/functions/createArray';
	import { cardRules } from '$lib/stores';
	import { cardRulesConst, cardList } from '$lib/data';
	import EndScreen from './EndScreen.svelte';
	import Card from './Card.svelte';
	import { Home } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

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
			peopleList = createArray(data);
		}

		visiblePeople = peopleList.slice(peopleList.length - maxVisibleCards, peopleList.length);
		showingElement = peopleList.length - 1; // index of last element
	});
</script>

<div class="center">
	<div class="container-inner">
		<EndScreen {peopleList} />
		{#each visiblePeople as person (person.myIndex)}
			<Card {...person} {changeData} {showingElement} />
		{/each}
	</div>

	<a href="/" class="smart-home-btn">
		<Home size={20} color="white" />
	</a>
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
		position: relative;
	}
	.container-inner {
		position: relative;
	}

	.smart-home-btn {
		position: absolute;
		right: calc(100% - 66px);
		top: 20px;
		transform: translate(0, 0);
		width: 46px;
		height: 46px;
		border-radius: 50%;
		background: rgba(20, 20, 20, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.15);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-decoration: none;
		cursor: pointer;
		z-index: 101;
		transition: left 1.5s cubic-bezier(0.25, 1, 0.5, 1), top 1.5s cubic-bezier(0.25, 1, 0.5, 1),
			transform 1.5s cubic-bezier(0.25, 1, 0.5, 1), width 1.5s cubic-bezier(0.25, 1, 0.5, 1),
			height 1.5s cubic-bezier(0.25, 1, 0.5, 1), border-radius 1.5s cubic-bezier(0.25, 1, 0.5, 1),
			background-color 1.5s cubic-bezier(0.25, 1, 0.5, 1),
			border-color 1.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 1.5s cubic-bezier(0.25, 1, 0.5, 1);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.smart-home-btn:hover {
		background: rgba(255, 68, 68, 0.2);
		border-color: rgba(255, 68, 68, 0.4);
	}
</style>
