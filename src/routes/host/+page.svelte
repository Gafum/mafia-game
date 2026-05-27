<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import { allowToManipulate } from './hostStore.js';
	import HostHeader from './HostHeader.svelte';
	import RulesBlock from './RulesBlock.svelte';
	import PlayersBlock from './PlayersBlock.svelte';
	import HostScriptBlock from './HostScriptBlock.svelte';
	import NotesBlock from './NotesBlock.svelte';

	let notesText = '';

	// It is here because it prevent rebuilding of this array after each dropdown
	let peopleList = (page.state?.peopleList ?? []).map((element, i) => ({
		myIndex: element.myIndex ?? `init_${i}`,
		...element,
		alive: element.alive ?? true
	}));

	let hostPageBlocks = [
		{ name: 'Правила гри', component: RulesBlock, isOpen: false },
		{ name: 'Нотатки', component: null, isOpen: true },
		{ name: 'Гравці', component: null, isOpen: false },
		{ name: 'Слова ведучого', component: HostScriptBlock, isOpen: false }
	];

	onMount(() => {
		allowToManipulate.set(false);
	});
</script>

<div class="host-page main-conteiner">
	<HostHeader />

	{#each hostPageBlocks as blockData (blockData.name)}
		<DropdownBlock bind:open={blockData.isOpen}>
			<h2 slot="title" class="host-headline">{blockData.name}</h2>
			{#if blockData.name === 'Нотатки'}
				<NotesBlock bind:text={notesText} />
			{:else if blockData.name === 'Гравці'}
				<PlayersBlock bind:peopleList />
			{:else}
				<svelte:component this={blockData.component} {...blockData.props} />
			{/if}
		</DropdownBlock>
	{/each}

	<StandardLinks />
</div>

<style>
	.host-page {
		min-height: 100vh;
		min-height: 100lvh;
		padding: 16px 16px 40px;
		display: flex;
		flex-direction: column;
		gap: 18px;
		color: white;
	}

	.host-headline {
		font-size: 23px;
		color: white;
	}

	@media (max-width: 500px) {
		.host-page {
			padding: 12px 10px 40px;
			gap: 14px;
		}
	}
</style>
