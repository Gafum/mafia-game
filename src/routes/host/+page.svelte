<script>
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import HostHeader from './HostHeader.svelte';
	import RulesBlock from './RulesBlock.svelte';
	import PlayersBlock from './PlayersBlock.svelte';
	import HostScriptBlock from './HostScriptBlock.svelte';
	import NotesBlock from './NotesBlock.svelte';

	const hostPageBlocks = [
		{ name: 'Правила гри', component: RulesBlock, isDefaultOpen: false, props: {} },
		{
			name: 'Гравці',
			component: PlayersBlock,
			isDefaultOpen: true,
			props: { onOpenRole: openRole }
		},
		{ name: 'Слова ведучого', component: HostScriptBlock, isDefaultOpen: true, props: {} },
		{ name: 'Нотатки', component: NotesBlock, isDefaultOpen: false, props: {} }
	];

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
</script>

<div class="host-page main-conteiner">
	<HostHeader {night} onAddNight={addNight} />

	{#each hostPageBlocks as blockData}
		<DropdownBlock open={blockData.isDefaultOpen}>
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
