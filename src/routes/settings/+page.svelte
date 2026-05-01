<script>
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cardRules, setCookie, cardRulesConst } from '$lib/stores';
	import { generateGame } from '$lib/functions/settingsRandomizer';
	import { bigDescriptionList } from '$lib/data';

	import { Users, Zap, Annoyed } from 'lucide-svelte';

	let state = { ...cardRulesConst };
	let targetTotal = 10;
	let isMount = false;

	const specialKeys = Object.keys(cardRulesConst).filter((k) => !['mans', 'mafias'].includes(k));

	// total players
	$: totalPlayers =
		Number(state.mans) +
		Number(state.mafias) +
		specialKeys.reduce((sum, key) => sum + (state[key] ? 1 : 0), 0);

	// autosave
	$: if (isMount) {
		cardRules.set(state);
		setCookie('gameSettings', state, 30);
	}

	function onlyNumber(e, max) {
		let val = e.target.value;
		let num = parseInt(val.replace(/[^0-9]/g, ''));

		if (val.toString().length > num.toString().length) return null;

		if (!val) return '';

		if (!isNaN(num) && num <= max) {
			return num;
		}
		return null;
	}

	function handleNumber(e, key, max) {
		let num = onlyNumber(e, max);
		if (num !== null) {
			state[key] = num;
		} else {
			e.target.value = state[key];
		}
	}

	function normalize(value, min, max) {
		if (!value || value < min) return min;
		if (value > max) return max;
		return value;
	}

	function handleRandomGameInput(e) {
		let num = onlyNumber(e, 50);
		if (num !== null) {
			targetTotal = num;
		} else {
			e.target.value = targetTotal;
		}
	}

	function handleRandom() {
		state = generateGame(targetTotal);
	}

	onMount(() => {
		if (!browser) return;

		let data = $cardRules;
		if (data) {
			state = { ...cardRulesConst, ...data };
		}

		isMount = true;
	});
</script>

<div class="mafia-setup-screen">
	<div class="setup-card">
		<header>
			<h1><Annoyed color="#ff4444" size={32} /> НАЛАШТУВАННЯ</h1>
			<div class="total-badge">
				<Users size={18} color="#fff" />
				<span>{totalPlayers} / 50</span>
			</div>
		</header>

		<main>
			<div class="generator-box">
				<div class="gen-input-group">
					<label for="targetTotal">Кількість гравців:</label>
					<input
						id="randomPlayer"
						type="text"
						value={targetTotal}
						on:input={(e) => handleRandomGameInput(e)}
						on:blur={() => (targetTotal = normalize(targetTotal, 3, 50))}
					/>
				</div>
				<button class="random-btn-top" on:click={handleRandom}>
					<Zap size={18} color="#fff" /> РАНДОМ
				</button>
			</div>

			<section class="base-roles">
				<div class="role-control">
					<div class="label-row">
						<label for="mansInput">Мирні жителі</label>
						<input
							id="mansInput"
							value={state.mans}
							on:input={(e) => handleNumber(e, 'mans', 24)}
							on:blur={() => (state.mans = normalize(state.mans, 1, 24))}
						/>
					</div>
					<input type="range" min="1" max="24" bind:value={state.mans} class="red-slider" />
				</div>

				<div class="role-control">
					<div class="label-row">
						<label for="mafiasInput">Мафія</label>
						<input
							id="mafiasInput"
							value={state.mafias}
							on:input={(e) => handleNumber(e, 'mafias', 20)}
							on:blur={() => (state.mafias = normalize(state.mafias, 0, 20))}
						/>
					</div>
					<input type="range" min="0" max="20" bind:value={state.mafias} class="red-slider" />
				</div>
			</section>

			<div class="special-roles-grid">
				{#each specialKeys as key}
					<label class="role-checkbox" class:active={state[key]}>
						<input type="checkbox" bind:checked={state[key]} />
						<div class="role-box-content">
							<svelte:component this={bigDescriptionList[key].icon} size={20} color="#ffffff" />
							<span>{bigDescriptionList[key].name}</span>
						</div>
					</label>
				{/each}
			</div>
		</main>
		<div class="home-btn">
			<HomeBtn size={50} />
		</div>
	</div>
</div>

<style>
	:global(body) {
		background-color: #050505;
		margin: 0;
		padding: 0;
	}

	.mafia-setup-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
		background: radial-gradient(circle at center, #1a0505 0%, #050505 100%);
		font-family: 'Segoe UI', Roboto, sans-serif;
	}

	.setup-card {
		background: rgba(20, 20, 20, 0.95);
		border: 1px solid #333;
		border-top: 3px solid #ff4444;
		width: 100%;
		max-width: 500px;
		border-radius: 12px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
		padding: 25px;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid #333;
		padding-bottom: 15px;
	}

	header h1 {
		color: #fff;
		font-size: 1.1rem;
		letter-spacing: 2px;
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
	}

	.total-badge {
		background: #ff4444;
		color: white;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.total-badge span {
		color: #fff;
	}

	/* Стилі генератора */
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
		transition: transform 0.2s;
	}

	.random-btn-top:active {
		transform: scale(0.95);
	}

	/* Стилі для повзунків та інпутів */
	.role-control {
		margin-bottom: 25px;
	}

	.label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.label-row label {
		color: #fff;
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.label-row input {
		background: #222;
		border: 1px solid #444;
		color: #ff4444;
		width: 50px;
		padding: 5px;
		text-align: center;
		border-radius: 6px;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.red-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #333;
		border-radius: 3px;
		outline: none;
	}

	.red-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		background: #ff4444;
		border-radius: 50%;
		cursor: pointer;
	}

	.special-roles-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 20px;
	}

	.role-checkbox {
		cursor: pointer;
	}

	.role-checkbox input {
		display: none;
	}

	.role-box-content {
		background: #1a1a1a;
		border: 1px solid #333;
		padding: 10px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: #777;
		transition: all 0.2s ease;
	}

	.role-box-content span {
		color: #fff;
		font-size: 0.9rem;
	}

	.role-checkbox.active .role-box-content {
		border-color: #ff4444;
		background: rgba(255, 68, 68, 0.1);
	}

	.home-btn {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}

	@media (max-width: 400px) {
		.special-roles-grid {
			grid-template-columns: 1fr;
		}
		.generator-box {
			flex-direction: column;
		}
	}
</style>
