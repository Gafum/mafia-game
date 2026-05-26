<script>
	import { page } from '$app/state';
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

	let isRulesOpen = false;
	let isNotesOpen = true;
	let isPlayersOpen = true;
	let isScriptOpen = false;

	let notesText = '';
	let peopleList = (page.state?.peopleList ?? []).map((element, i) => ({
		myIndex: element.myIndex ?? `init_${i}`,
		...element,
		alive: element.hasOwnProperty('alive') ? element.alive : true
	}));
</script>

<div class="host-page main-conteiner">
	<HostHeader {night} onAddNight={addNight} />

	<DropdownBlock bind:open={isRulesOpen}>
		<h2 slot="title" class="host-headline">Правила гри</h2>
		<RulesBlock />
	</DropdownBlock>

	<DropdownBlock bind:open={isNotesOpen}>
		<h2 slot="title" class="host-headline">Нотатки</h2>
		<NotesBlock bind:text={notesText} />
	</DropdownBlock>

	<DropdownBlock bind:open={isPlayersOpen}>
		<h2 slot="title" class="host-headline">Гравці</h2>
		<PlayersBlock bind:peopleList {openRole} />
	</DropdownBlock>

	<DropdownBlock bind:open={isScriptOpen}>
		<h2 slot="title" class="host-headline">Слова ведучого</h2>
		<HostScriptBlock />
	</DropdownBlock>

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
