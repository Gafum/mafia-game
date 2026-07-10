<script>
	import { handleNumericInput, normalize } from './inputHelpers';
	import { Zap } from 'lucide-svelte';
	import { getMaxPlayerAmount } from '$lib/functions/findSpecialKeys';
	import '$lib/UI/Buttons/SimpleLink.css';

	export let handleRandom = () => {};
	export let totalPlayers = 0;

	// Створюємо внутрішній локальний стан для інпута
	let targetTotal = totalPlayers;
	let oldTotalPlayers = totalPlayers;

	// Синхронізуємо значення ТІЛЬКИ якщо батьківський компонент
	// дійсно прислав нове значення totalPlayers
	$: {
		if (totalPlayers !== oldTotalPlayers) {
			targetTotal = totalPlayers;
			oldTotalPlayers = totalPlayers;
		}
	}

	function handleTargetInput(e) {
		const maxAmount = getMaxPlayerAmount();
		const res = handleNumericInput(e, maxAmount);

		if (res.success) {
			targetTotal = res.value;
		} else {
			e.target.value = targetTotal;
		}
	}

	function submitForm() {
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
			on:blur={() => (targetTotal = normalize(targetTotal, 3, getMaxPlayerAmount()))}
			autocomplete="off"
		/>
	</div>
	<button
		type="submit"
		class="link-style red"
		style="font-size: 0.8rem; min-height: 33px; margin: 0; width: auto;"
	>
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

	@media (max-width: 400px) {
		.generator-box {
			flex-direction: column;
		}
	}
</style>
