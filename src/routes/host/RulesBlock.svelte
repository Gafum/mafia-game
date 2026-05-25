<script>
	import { gameRules } from '$lib/data';
	import NumberedList from '$lib/UI/NumberedList.svelte';
	import { Annoyed } from 'lucide-svelte';
	import '$lib/UI/Buttons/SimpleLink.css';
	import { allowToManipulate } from './hostStore.js';

	function toggleManipulate() {
		allowToManipulate.update((n) => !n);
	}
</script>

<NumberedList list={gameRules} />

<button
	on:click|preventDefault={toggleManipulate}
	class={'link-style ' + ($allowToManipulate ? 'green' : 'red')}
>
	<Annoyed size={20} color="#fff" class="mobile-hidden-icon" />
	{$allowToManipulate ? 'Скрити махлювання' : 'Підмішати карти'}
</button>
