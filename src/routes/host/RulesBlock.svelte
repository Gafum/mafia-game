<script>
	import { gameRules } from '$lib/data';
	import NumberedList from '$lib/UI/NumberedList.svelte';

	export let startGameWithNewList = () => {};
</script>

<NumberedList list={gameRules} />

<button href="/roles" class="start-game"> Підмішати карти </button>

<style>
	.start-game {
		text-align: center;
		display: block;
		padding: 8px 16px;
		background-color: #2c9182;
		border-radius: 5px;
		font-size: 20px;
		transition: box-shadow 0.2s;
		width: 100%;
		max-width: 500px;
		margin: 20px auto;
		font-size: 22px;
		color: #fff;
	}
</style>
