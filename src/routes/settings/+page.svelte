<script>
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { cardRules, setCookie } from '$lib/stores';
	import { generateGame } from '$lib/functions/settingsRandomizer';
	import { cardRulesConst, bigDescriptionList } from '$lib/data';
	import { findSpecialKeys, maxPlayerAmount } from '$lib/functions/findSpecialKeys';
	import { createArray } from '$lib/functions/createArray';

	import { Users, Zap, Annoyed } from 'lucide-svelte';

	let state = { ...cardRulesConst };
	let targetTotal = 10;
	let isMount = false;

	const specialKeys = findSpecialKeys();

	// total players
	$: totalPlayers =
		Number(state.mans) +
		Number(state.mafias) +
		specialKeys.reduce((sum, key) => sum + (state[key] ? 1 : 0), 0);

	$: targetTotal = totalPlayers;

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
		let num = onlyNumber(e, maxPlayerAmount);
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

	function goToHost() {
		goto('/host', {
			state: {
				peopleList: createArray($cardRules).map((id, index) => {
					return { id, uniqId: index };
				})
			}
		});
	}
</script>

<div class="main-conteiner mafia-setup-screen">
	<div class="setup-card">
		<header>
			<h1><Annoyed color="#ff4444" size={32} class="mobile-hidden-icon" /> Налаштування</h1>
			<div class="total-badge">
				<Users size={18} color="#fff" />
				<span>
					{totalPlayers}
					/
					{maxPlayerAmount}
				</span>
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
						on:blur={() => (targetTotal = normalize(targetTotal, 3, maxPlayerAmount))}
					/>
				</div>
				<button class="random-btn-top" on:click={handleRandom}>
					<Zap size={18} color="#fff" class="mobile-hidden-icon" /> РАНДОМ
				</button>
			</div>

			<section class="base-roles">
				<div class="role-control">
					<div class="label-row">
						<label for="mansInput">Мирні жителі</label>
						<input
							id="mansInput"
							value={state.mans}
							on:input={(e) => handleNumber(e, 'mans', cardRulesConst.mans)}
							on:blur={() => (state.mans = normalize(state.mans, 1, cardRulesConst.mans))}
						/>
					</div>
					<input
						type="range"
						min="1"
						max={cardRulesConst.mans}
						bind:value={state.mans}
						class="red-slider"
					/>
				</div>

				<div class="role-control">
					<div class="label-row">
						<label for="mafiasInput">Мафія</label>
						<input
							id="mafiasInput"
							value={state.mafias}
							on:input={(e) => handleNumber(e, 'mafias', cardRulesConst.mafias)}
							on:blur={() => (state.mafias = normalize(state.mafias, 0, cardRulesConst.mafias))}
						/>
					</div>
					<input
						type="range"
						min="0"
						max={cardRulesConst.mafias}
						bind:value={state.mafias}
						class="red-slider"
					/>
				</div>
			</section>

			<div class="special-roles-grid">
				{#each specialKeys as key}
					<label class="role-checkbox" class:active={state[key]}>
						<input type="checkbox" bind:checked={state[key]} />
						<div class="role-box-content">
							<svelte:component this={bigDescriptionList[key].icon} size={25} color="#ffffff" />
							<span>{bigDescriptionList[key].name}</span>
						</div>
					</label>
				{/each}
			</div>
		</main>

		<a href="/host" on:click|preventDefault={goToHost} class="random-btn-top host-link">
			<Users size={18} color="#fff" class="mobile-hidden-icon" /> Панель ведучого
		</a>
		<StandardLinks />
	</div>
</div>

<style>
	.mafia-setup-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
	}

	.setup-card {
		background: rgba(20, 20, 20, 0.95);
		border: 1px solid #333;
		border-top: 3px solid #ff4444;
		width: 100%;
		max-width: 500px;
		border-radius: 12px;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
		padding: 25px 25px 50px;
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
		font-size: 1.4rem;
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
		min-height: 33px;
	}

	.random-btn-top:active {
		transform: scale(0.95);
	}

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
		font-size: 1.2rem;
	}

	.role-checkbox.active .role-box-content {
		border-color: #ff4444;
		background: rgba(255, 68, 68, 0.1);
	}

	.host-link {
		margin-top: 20px;
		font-size: 18px;
		text-align: center;
		width: 100%;
		justify-content: center;
		gap: 10px;
	}

	@media (max-width: 400px) {
		.mafia-setup-screen {
			padding: 0;
		}
		.setup-card {
			background: #111;
			border: none;
			border-top: none;
			max-width: auto;
			border-radius: 0;
			box-shadow: none;
			padding: 16px 16px 50px;
		}
		.special-roles-grid {
			grid-template-columns: 1fr;
		}
		.generator-box {
			flex-direction: column;
		}
		header {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>
