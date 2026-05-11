<script>
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';

	import HostHeader from './HostHeader.svelte';
	import RulesBlock from './RulesBlock.svelte';
	import PlayersBlock from './PlayersBlock.svelte';
	import HostScriptBlock from './HostScriptBlock.svelte';

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

	<RulesBlock />

	<PlayersBlock onOpenRole={openRole} />

	<HostScriptBlock />

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

	:global(.host-block) {
		padding: 14px;
		border-radius: 14px;
		background: #141414;
	}

	:global(.host-headline) {
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
