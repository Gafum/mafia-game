<script>
	/** @type {import('./$types').PageData} */
	import Card from '$lib/UI/Card.svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { onMount } from 'svelte';
	import createArray from '$lib/functions/createData';
	import { cardRules, cardRulesConst } from '$lib/stores';
	import { cardList } from '$lib/data';

	let peopleList = [...cardList];

	let visiblePeople = [];

	let showingElement = 0;
	let maxVisibleCards = 3;

	function changeData(person) {
		try {
			if (peopleList.indexOf(person) + 1 == peopleList.length) {
				return;
			}
			showingElement = peopleList[peopleList.indexOf(person) + 1].id;
			maxVisibleCards++;
			visiblePeople = peopleList.slice(0, maxVisibleCards).reverse();
		} catch (e) {
			console.log(e);
			showingElement = 0;
		}
	}

	onMount(() => {
		let data = { ...cardRulesConst };

		try {
			data = $cardRules;
			if (!data) data = cardRulesConst;
		} catch (e) {
			console.log(e);
		}

		peopleList = createArray(data).map(
			({ name = 'Мирний', description = 'Ну шо ш?', myImg = 'Man2', tag = 'mans' }, index) => {
				return { name, description, myImg, tag, id: index };
			}
		);

		visiblePeople = peopleList.slice(0, maxVisibleCards).reverse();
	});
</script>

<div class="center">
	<div class="conteiner-inner">
		<!-- Must be first -->
		<div class="home-btn">
			<HomeBtn />
		</div>
		{#each visiblePeople as person (person.id)}
			<Card
				{...person}
				changeData={() => changeData(person)}
				{showingElement}
				elementIndex={peopleList.indexOf(person)}
			/>
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
		width: 100px;
		height: 100px;
	}
</style>
