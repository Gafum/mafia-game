<script>
	import { bigDescriptionList } from '$lib/data';
	import { cardRules } from '$lib/stores';
	import { findSpecialKeys } from '$lib/functions/findSpecialKeys';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';
	import NumberedList from '../../lib/UI/NumberedList.svelte';

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

	<NumberedList list={hostScript} />
</DropdownBlock>
