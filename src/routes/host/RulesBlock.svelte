<script>
	import { gameRules } from '$lib/data';
	import NumberedList from '$lib/UI/NumberedList.svelte';
	import { Annoyed } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	function goToPlay() {
		goto('/play', {
			state: {
				peopleList: []
			}
		});
	}
</script>

<NumberedList list={gameRules} />

<a href="/play" on:click|preventDefault={goToPlay} class="start-game">
	<Annoyed size={20} color="#fff" class="mobile-hidden-icon" /> Почати гру
</a>

<style>
	.start-game {
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
		.start-game:active {
			transform: scale(0.95);
		}
		.start-game:hover {
			filter: brightness(1.15);
			box-shadow: 0px 0px 8px #ff4444;
		}
	}
</style>
