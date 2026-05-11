<script>
	/** @type {import('./$types').PageData} */
	import { goto } from '$app/navigation';
	import Card from './Card.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { onMount } from 'svelte';
	import { createArray } from '$lib/functions/createArray';
	import { cardRules } from '$lib/stores';
	import { cardRulesConst, cardList } from '$lib/data';

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

	function goToHost() {
		goto('/host', {
			state: {
				peopleList
			}
		});
	}

	onMount(() => {
		let data = { ...cardRulesConst };

		try {
			data = { ...cardRulesConst, ...$cardRules };
			if (!data) data = cardRulesConst;
		} catch (e) {
			console.log(e);
		}

		peopleList = createArray(data).map((id, index) => {
			return { id, uniqId: index };
		});

		visiblePeople = peopleList.slice(peopleList.length - maxVisibleCards, peopleList.length);
		showingElement = peopleList.length - 1; // index of last element
	});
</script>

<div class="center">
	<div class="conteiner-inner">
		<div class="home-btn">
			<!-- Must be first -->
			<StandardLinks size={75} blockStyles="flex-direction: column;" />
			<a href="/host" on:click|preventDefault={goToHost} class="host-link"> Ведучий </a>
		</div>
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
	.conteiner-inner {
		position: relative;
	}

	.home-btn {
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		position: absolute;
	}

	.host-link {
		margin-top: 17px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 40px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.08);
		color: #f7f7f7;
		text-decoration: none;
		font-weight: 700;
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.host-link:hover {
		background: rgba(255, 255, 255, 0.14);
		transform: translateY(-1px);
	}
</style>
