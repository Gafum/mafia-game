<script>
	import { cardRulesConst } from '$lib/data';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';

	let tagList = Object.keys(cardRulesConst);
</script>

<div class="main-conteiner roles-conteiner">
	{#each tagList as tag}
		<CardWithText {tag} />
	{/each}
	<StandardLinks size={75} blockStyles="max-width: 280px;" />
</div>

<style>
	.roles-conteiner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		padding: 16px 16px 40px;
		height: auto;
	}
</style>
