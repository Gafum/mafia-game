<script>
	import { gameRules } from '$lib/data';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';
	import NumberedList from '../../lib/UI/NumberedList.svelte';

	let showRules = false;
</script>

<DropdownBlock open={showRules}>
	<h2 slot="title" class="host-headline">Правила гри</h2>

	<NumberedList list={gameRules} />
</DropdownBlock>
