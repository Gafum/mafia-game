<script>
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import RulesList from '../rules/RulesList.svelte';

	let showRules = false;
</script>

<DropdownBlock open={showRules}>
	<h2 slot="title" class="host-headline">Правила гри</h2>

	<RulesList />
</DropdownBlock>
