<script>
	import { BookOpen } from 'lucide-svelte';
	import DropdownBlock from '$lib/UI/DropdownBlock.svelte';

	import RulesList from '../rules/RulesList.svelte';

	let showRules = false;
</script>

<DropdownBlock open={showRules}>
	<div slot="title" class="title">
		<BookOpen size={18} color="#fff" />
		{showRules ? 'Скрий' : 'Покажи'} правила
	</div>

	<RulesList />
</DropdownBlock>

<style>
	.title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 18px;
		color: #fff;
	}
</style>
