<script>
	import { handleNumericInput, normalize } from './inputHelpers';
	import { Zap } from 'lucide-svelte';
	import { maxPlayerAmount } from '$lib/functions/findSpecialKeys';

	export let handleRandom = (targetTotal) => {};
	export let totalPlayers = 0;

	function handleTargetInput(e) {
		const res = handleNumericInput(e, maxPlayerAmount);
		if (res.success) targetTotal = res.value;
		else e.target.value = targetTotal;
	}

	$: targetTotal = totalPlayers;

	function submitForm(event) {
		event.preventDefault();
		handleRandom(targetTotal);
	}
</script>

<form class="generator-box" on:submit|preventDefault={submitForm}>
	<div class="gen-input-group">
		<label for="randomPlayer">Кількість гравців:</label>
		<input
			id="randomPlayer"
			type="text"
			value={targetTotal}
			on:input={handleTargetInput}
			on:blur={() => (targetTotal = normalize(targetTotal, 3, maxPlayerAmount))}
		/>
	</div>
	<button class="random-btn-top" on:click={submitForm}>
		<Zap size={18} color="#fff" class="mobile-hidden-icon" /> РАНДОМ
	</button>
</form>

<style>
	.generator-box {
		background: #151515;
		padding: 15px;
		border-radius: 10px;
		border: 1px dashed #444;
		margin-bottom: 25px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
	}

	.gen-input-group {
		display: flex;
		align-items: center;
		gap: 10px;
		color: #ccc;
		font-size: 0.9rem;
	}

	.gen-input-group label {
		color: #fff;
	}

	.gen-input-group input {
		width: 60px;
		background: #222;
		border: 1px solid #444;
		color: #fff;
		padding: 5px;
		border-radius: 4px;
		text-align: center;
	}

	.random-btn-top {
		background: #ff4444;
		color: white;
		border: none;
		padding: 8px 15px;
		border-radius: 6px;
		font-weight: bold;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 5px;
		font-size: 0.8rem;
		min-height: 33px;
		transition-property: filter box-shadow transform;
		transition-duration: 0.2s;
	}

	@media (hover: hover) {
		.random-btn-top:active {
			transform: scale(0.95);
		}
		.random-btn-top:hover {
			filter: brightness(1.15);
			box-shadow: 0px 0px 8px #ff4444;
		}
	}

	@media (max-width: 400px) {
		.generator-box {
			flex-direction: column;
		}
	}
</style>
