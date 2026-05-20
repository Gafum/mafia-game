<script>
	import { Users } from 'lucide-svelte';
	import { createArray } from '$lib/functions/createArray';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { goto } from '$app/navigation';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	export let settingsState = {};

	const goToHost = () =>
		goto('/host', {
			state: {
				peopleList: createArray(settingsState).map((id, index) => {
					return { id, uniqId: index };
				})
			}
		});
</script>

<SimpleLink href="/host" actionCallback={goToHost}>
	<Users size={18} color="#fff" class="mobile-hidden-icon" /> Панель ведучого
</SimpleLink>
<StandardLinks />
