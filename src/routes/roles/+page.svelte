<script>
	import { cardList } from '$lib/data';
	import CardWithText from './CardWithText.svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import createUnicCardList from '$lib/functions/createUnicCardList';
	let visbleList = createUnicCardList(cardList);
</script>

<div
	style="display: flex;
	flex-direction:column;
	justify-content:center;
	align-items: center;
	gap: 10px;
	padding: 10px"
>
	{#each visbleList as card}
		<CardWithText {...card} />
	{/each}
	<HomeBtn />
</div>
