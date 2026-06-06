<script>
	import { bigDescriptions, cardRules } from '$lib/stores';
	import { findSpecialKeys } from '$lib/functions/findSpecialKeys';
	import NumberedList from '$lib/UI/NumberedList.svelte';

	function findEnabledKeys() {
		return findSpecialKeys().filter((tag) => Boolean($cardRules[tag]));
	}

	let hostScript = [
		'Місто засинає',
		'Мафія прокидається',
		...findEnabledKeys().map((tag) => `${$bigDescriptions[tag]?.name || tag} прокидається`),
		'Місто прокидається'
	];
</script>

<NumberedList list={hostScript} />
