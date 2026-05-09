<script>
	import { cardList } from '$lib/data';
	import CardWithText from './CardWithText.svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import createUnicCardList from '$lib/functions/createUnicCardList';
	import { onMount } from 'svelte';
	let visbleList = [];

	onMount(() => {
		visbleList = createUnicCardList(cardList);
	});
</script>

<div class="main-conteiner roles-conteiner">
	{#each visbleList as card}
		<CardWithText {...card} />
	{/each}
	<HomeBtn />
</div>

<style>
	.roles-conteiner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		padding: 16px;
		height: auto;
	}
</style>
