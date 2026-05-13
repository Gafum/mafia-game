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
			<StandardLinks
				size={78}
				blockStyles="flex-direction: column; margin-top: 0px; padding: 0; justify-content: center;"
			/>
			<a href="/host" on:click|preventDefault={goToHost} class="host-link">
				Панель<br /> ведучого
			</a>
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
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: column;
		align-items: center;
		width: 82vw;
		max-width: 400px;

		padding: 30px;
		border-radius: 35px;
		background: rgba(20, 20, 20, 0.8);

		@supports (backdrop-filter: blur(1px)) {
			background: rgba(0, 0, 0, 0.4);
			backdrop-filter: blur(10px);
			-webkit-backdrop-filter: blur(10px);
		}

		border: 1px solid rgba(255, 255, 255, 0.15);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
		z-index: 10;
	}

	@media (max-width: 500px) {
		.home-btn {
			max-width: 280px;
			width: 70vw;
			padding: 20px 10px;
			border-radius: 25px;
		}
	}

	.host-link {
		margin-top: 20px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80%;
		max-width: 220px;
		height: 44px;

		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 10px;

		color: #fff;
		font-weight: 700;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 13px;
		letter-spacing: 1px;
		transition: all 0.3s ease;
		text-align: center;
	}

	@media (hover: hover) {
		.host-link:hover {
			background: rgba(255, 255, 255, 0.2);
			transform: translateY(-2px);
			border-color: rgba(255, 255, 255, 0.4);
		}
	}
</style>
