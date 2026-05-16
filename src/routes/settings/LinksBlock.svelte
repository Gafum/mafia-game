<script>
	import { Users } from 'lucide-svelte';
	import { createArray } from '$lib/functions/createArray';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { goto } from '$app/navigation';

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

<a href="/host" on:click|preventDefault={goToHost} class="host-link">
	<Users size={18} color="#fff" class="mobile-hidden-icon" /> Панель ведучого
</a>
<StandardLinks />

<style>
	.host-link {
		background: #ff4444;
		color: white;
		border: none;
		padding: 8px 15px;
		border-radius: 6px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		min-height: 33px;
		transition-property: filter, box-shadow, transform;
		transition-duration: 0.2s;
		margin-top: 20px;
		font-size: 18px;
		text-align: center;
		width: 100%;
		justify-content: center;
		gap: 10px;
	}

	@media (hover: hover) {
		.host-link:active {
			transform: scale(0.95);
		}
		.host-link:hover {
			filter: brightness(1.15);
			box-shadow: 0px 0px 8px #ff4444;
		}
	}
</style>
