<script>
	import { Users, FileUser } from 'lucide-svelte';
	import { createArray } from '$lib/functions/createArray';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { goto } from '$app/navigation';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	export let settingsState = {};

	const goToHost = () =>
		goto('/host', {
			state: {
				peopleList: createArray(settingsState)
			}
		});
</script>

<SimpleLink href="/custom-cards" type="blue">
	<FileUser size={18} color="#fff" style="stroke: #fff;" class="mobile-hidden-icon" />Нові картки
</SimpleLink>

<SimpleLink href="/host" actionCallback={goToHost}>
	<Users size={18} color="#fff" class="mobile-hidden-icon" /> Панель ведучого
</SimpleLink>

<StandardLinks />
