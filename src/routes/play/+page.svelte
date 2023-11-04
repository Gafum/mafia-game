<script>
	/** @type {import('./$types').PageData} */
	import Card from '$lib/UI/Card.svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { onMount } from 'svelte';
	import createArray from '$lib/functions/createData';

	let peopleList = [{ name: 'Мирний', description: 'Та я мириний мен', myImg: 'Man2', id: 1 }];

	let showingElement = 0;

	function changeData(person) {
		try {
			showingElement = peopleList[peopleList.indexOf(person) - 1].id;
		} catch (e) {
			console.log(e);
			showingElement = 0;
		}
	}

	onMount(() => {
		let data = {
			mans: 4,
			mafias: 2,
			withDoctor: true,
			withCop: true
		};
		try {
			data = JSON.parse(localStorage.getItem('cards'));
			if (!data) return;
		} catch (e) {
			console.log(e);
		}
		peopleList = createArray(data).map((elem, i) => {
			return { ...elem, id: i };
		});

		showingElement = peopleList.at(-1).id;
	});
</script>

<div class="center">
	<div class="conteiner-inner">
		<!-- Must be first -->
		<div class="home-btn">
			<HomeBtn />
		</div>
		{#each peopleList as person (person.id)}
			<Card {...person} changeData={() => changeData(person)} {showingElement} />
		{/each}
	</div>
</div>

<style>
	.center {
		height: 100%;
		width: 100%;
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
