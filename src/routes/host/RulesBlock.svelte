<script>
	import { gameRules } from '$lib/data';
	import NumberedList from '$lib/UI/NumberedList.svelte';
	import { Annoyed } from 'lucide-svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	export let allowToManipulate;

	function setManipulate() {
		allowToManipulate.update((n) => !n);
	}
</script>

<NumberedList list={gameRules} />

<SimpleLink href="/host" actionCallback={setManipulate} type={$allowToManipulate ? 'green' : 'red'}>
	<Annoyed size={20} color="#fff" class="mobile-hidden-icon" />
	{$allowToManipulate ? 'Скрити махлювання' : 'Підмішати карти'}
</SimpleLink>
