<script>
	import { onMount } from 'svelte';
	import { cardRulesConst } from '$lib/data';
	import { fade } from 'svelte/transition';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';

	let tagList = Object.keys(cardRulesConst);
	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});
</script>

<div class="main-conteiner roles-conteiner">
	{#if mounted}
		<div class="cards-list-wrapper" in:fade={{ duration: 200 }}>
			{#each tagList as tag}
				<CardWithText {tag} />
			{/each}
			<StandardLinks size={75} blockStyles="max-width: 280px;" />
		</div>
	{/if}
</div>

<style>
	.roles-conteiner {
		padding: 16px 16px 40px;
		height: auto;
	}

	.cards-list-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
</style>
