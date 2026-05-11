<script>
	import { bigDescriptionList } from '$lib/data';
	import { cardRules } from '$lib/stores';
	import { findSpecialKeys } from '$lib/functions/findSpecialKeys';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	function findEnabledKeys() {
		return findSpecialKeys().filter((tag) => Boolean($cardRules[tag]));
	}

	let showScript = true;

	let hostScript = [
		'Місто засинає',
		'Мафія прокидається',
		...findEnabledKeys().map((tag) => `${bigDescriptionList[tag].name} прокидається`),
		'Місто прокидається'
	];
</script>

<DropdownBlock open={showScript}>
	<h2 slot="title" class="host-headline">Слова ведучого</h2>

	<div class="script-list">
		{#each hostScript as line, index}
			<div class="line">
				<span>{index + 1}</span>
				<p>{line}</p>
			</div>
		{/each}
	</div>
</DropdownBlock>

<style>
	.script-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.line {
		background: #1b1b1b;
		padding: 12px;
		border-radius: 10px;

		display: flex;
		align-items: center;
		gap: 7px;
		box-shadow: 4px 4px 5px #0e0e0e50;
	}

	.line span {
		color: #999;
		font-size: 14px;
		min-width: 15px;
	}

	.line p {
		color: white;
		font-size: 16px;
	}
</style>
