<script>
	import { onMount } from 'svelte';
	import { bigDescriptions } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	let tagList = [];
	bigDescriptions.subscribe(($rules) => {
		tagList = Object.keys($rules);
	});
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
			{#each tagList as tag, index}
				<CardWithText {tag} isFirst={index === 0} />
			{/each}
			<SimpleLink href="/custom-cards" props={{ style: '' }}>Нові картки</SimpleLink>
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
	@media (min-width: 720px) {
		:global(.cards-list-wrapper .link-style) {
			width: 85vw;
			max-width: none;
			font-size: 25px;
		}
	}
</style>
