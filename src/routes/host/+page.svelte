<script>
	import { writable } from 'svelte/store';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import HostHeader from './HostHeader.svelte';
	import RulesBlock from './RulesBlock.svelte';
	import PlayersBlock from './PlayersBlock.svelte';
	import HostScriptBlock from './HostScriptBlock.svelte';
	import NotesBlock from './NotesBlock.svelte';

	let night = 1;
	let modalHeroTag = 'mans';
	let isModalOpen = false;

	function addNight() {
		night++;
	}

	function openRole(tag) {
		modalHeroTag = tag;
		isModalOpen = true;
	}

	let hostPageBlocks = [
		{
			name: 'Правила гри',
			component: RulesBlock,
			isOpen: false
		},
		{ name: 'Нотатки', component: NotesBlock, isOpen: false, props: {} },
		{
			name: 'Гравці',
			component: PlayersBlock,
			isOpen: false,
			props: { onOpenRole: openRole }
		},
		{ name: 'Слова ведучого', component: HostScriptBlock, isOpen: false, props: {} }
	];

	import { onMount } from 'svelte';
	onMount(() => {
		setTimeout(() => {
			hostPageBlocks[1].isOpen = true;
			hostPageBlocks[2].isOpen = true;
		}, 100);
	});
</script>

<div class="host-page main-conteiner">
	<HostHeader {night} onAddNight={addNight} />

	{#each hostPageBlocks as blockData (blockData.name)}
		<DropdownBlock bind:open={blockData.isOpen}>
			<h2 slot="title" class="host-headline">{blockData.name}</h2>
			<svelte:component this={blockData.component} {...blockData.props} />
		</DropdownBlock>
	{/each}

	<RoleDetailsModal
		open={isModalOpen}
		heroTag={modalHeroTag}
		on:close={() => (isModalOpen = false)}
	/>

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
