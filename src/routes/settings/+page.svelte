<script>
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cardRules, setCookie } from '$lib/stores';
	import {
		Users,
		Shield,
		Zap,
		Annoyed,
		Crosshair,
		HeartPulse,
		UserCheck,
		Briefcase,
		Bomb
	} from 'lucide-svelte';

	let mans = 4;
	let mafias = 1;
	let withDoctor = true,
		withCop = true,
		withKamikaze = false,
		withManiac = false,
		withSecurity = false,
		withLawyer = false;

	let targetTotal = 10;

	let isMount = false;

	// Розрахунок загальної кількості
	$: totalPlayers =
		Number(mans) +
		Number(mafias) +
		(withDoctor ? 1 : 0) +
		(withCop ? 1 : 0) +
		(withKamikaze ? 1 : 0) +
		(withManiac ? 1 : 0) +
		(withSecurity ? 1 : 0) +
		(withLawyer ? 1 : 0);

	// Auto Save
	$: if (isMount) {
		let data = {
			mans: Number(mans),
			mafias: Number(mafias),
			withDoctor,
			withCop,
			withKamikaze,
			withManiac,
			withSecurity,
			withLawyer
		};
		cardRules.set(data);
		setCookie('gameSettings', data, 30);
	}

	function handleMansInput(e) {
		let val = e.target.value;
		let num = parseInt(val.replace(/[^0-9]/g, ''));
		if (val.length == 0) {
			return;
		}
		if (num <= 24 && !isNaN(val) && val.replace(/[^0-9]/g, '').length > 0) {
			mans = num;
			return;
		}
		e.target.value = mans;
	}

	function handleMansBlur() {
		if (mans === '' || mans < 1 || typeof mans != 'number') {
			mans = 1;
		} else {
			if (mans > 24) {
				mans = 24;
			}
		}
	}

	function handleMafiaInput(e) {
		let val = e.target.value;
		let num = parseInt(val.replace(/[^0-9]/g, ''));
		if (val.length == 0) {
			return;
		}
		if (num <= 20 && !isNaN(val) && val.replace(/[^0-9]/g, '').length > 0) {
			mafias = num;
			return;
		}
		e.target.value = mafias;
	}

	function handleMafiaBlur() {
		if (mafias === '' || mafias < 0 || typeof mafias != 'number') {
			mafias = 0;
		} else {
			if (mans > 20) {
				mans = 20;
			}
		}
	}

	// ФУНКЦІЯ РОЗУМНОГО РАНДОМУ
	function handleRandom() {
		let remaining = targetTotal;

		// 1. Скидаємо все
		withDoctor = false;
		withCop = false;
		withKamikaze = false;
		withManiac = false;
		withSecurity = false;
		withLawyer = false;

		// 2. Визначаємо кількість мафії (приблизно 25-30% від гравців)
		let suggestedMafia = Math.max(1, Math.floor(remaining / 3.5));
		mafias = suggestedMafia;
		remaining -= mafias;

		// 3. Додаємо ролі, якщо вистачає людей
		if (remaining > 1 && Math.random() > 0.2) {
			withCop = true;
			remaining--;
		}
		if (remaining > 1 && Math.random() > 0.2) {
			withDoctor = true;
			remaining--;
		}
		if (remaining > 1 && Math.random() > 0.5) {
			withManiac = true;
			remaining--;
		}
		if (remaining > 1 && Math.random() > 0.7) {
			withLawyer = true;
			remaining--;
		}
		if (remaining > 1 && Math.random() > 0.7) {
			withSecurity = true;
			remaining--;
		}
		if (remaining > 1 && Math.random() > 0.8) {
			withKamikaze = true;
			remaining--;
		}

		// 4. Всі інші — мирні (але не менше 1)
		mans = Math.max(1, remaining);
	}

	onMount(() => {
		if (!browser) return;
		try {
			let data = $cardRules;
			if (data) {
				mans = data.mans || 4;
				mafias =
					data.mafias.toString().replace(/[^0-9]/g, '').length > 0 && data.mafias >= 0 ? data.mafias : 1;
				withDoctor = data.withDoctor;
				withCop = data.withCop;
				withKamikaze = data.withKamikaze;
				withManiac = data.withManiac;
				withSecurity = data.withSecurity;
				withLawyer = data.withLawyer;
			}
		} catch (e) {
			console.log(e);
		}
		isMount = true;
	});
</script>

<div class="mafia-setup-screen">
	<div class="setup-card">
		<header>
			<h1><Annoyed color="#ff4444" size={32} /> НАЛАШТУВАННЯ</h1>
			<div class="total-badge">
				<Users size={18} color="#ffffff" />
				<span>{totalPlayers} / 50</span>
			</div>
		</header>

		<main class="content">
			<!-- НОВИЙ БЛОК ГЕНЕРАТОРА ЗВЕРХУ -->
			<div class="generator-box">
				<div class="gen-input-group">
					<label for="targetTotal">Кількість гравців:</label>
					<input type="number" id="targetTotal" bind:value={targetTotal} min="3" max="50" />
				</div>
				<button class="random-btn-top" on:click={handleRandom}>
					<Zap size={18} fill="currentColor" /> РАНДОМ
				</button>
			</div>

			<!-- Секція основних ролей -->
			<section class="base-roles">
				<div class="role-control">
					<div class="label-row">
						<label for="mans">Мирні жителі</label>
						<input
							type="string"
							value={mans}
							on:input={handleMansInput}
							on:blur={handleMansBlur}
							id="mans"
						/>
					</div>
					<input type="range" bind:value={mans} min="1" max="24" class="red-slider" />
				</div>

				<div class="role-control">
					<div class="label-row">
						<label for="mafia">Мафія</label>
						<input
							id="mafia"
							type="string"
							value={mafias}
							on:input={handleMafiaInput}
							on:blur={handleMafiaBlur}
						/>
					</div>
					<input type="range" bind:value={mafias} min="0" max="20" class="red-slider" />
				</div>
			</section>

			<!-- Секція особливих ролей (Чекбокси) -->
			<div class="special-roles-grid">
				<label class="role-checkbox" class:active={withCop}>
					<input type="checkbox" bind:checked={withCop} />
					<div class="role-box-content">
						<Shield size={20} color="#ffffff" />
						<span>Шериф</span>
					</div>
				</label>

				<label class="role-checkbox" class:active={withDoctor}>
					<input type="checkbox" bind:checked={withDoctor} />
					<div class="role-box-content">
						<HeartPulse size={20} color="#ffffff" />
						<span>Лікар</span>
					</div>
				</label>

				<label class="role-checkbox" class:active={withManiac}>
					<input type="checkbox" bind:checked={withManiac} />
					<div class="role-box-content">
						<Crosshair size={20} color="#ffffff" />
						<span>Маньяк</span>
					</div>
				</label>

				<label class="role-checkbox" class:active={withKamikaze}>
					<input type="checkbox" bind:checked={withKamikaze} />
					<div class="role-box-content">
						<Bomb size={20} color="#ffffff" />
						<span>Камікадзе</span>
					</div>
				</label>

				<label class="role-checkbox" class:active={withSecurity}>
					<input type="checkbox" bind:checked={withSecurity} />
					<div class="role-box-content">
						<UserCheck size={20} color="#ffffff" />
						<span>Охоронець</span>
					</div>
				</label>

				<label class="role-checkbox" class:active={withLawyer}>
					<input type="checkbox" bind:checked={withLawyer} />
					<div class="role-box-content">
						<Briefcase size={20} color="#ffffff" />
						<span>Адвокат</span>
					</div>
				</label>
			</div>
		</main>

		<footer class="footer">
			<HomeBtn size={50} />
		</footer>
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
		background: #8b0000;
		color: white;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 6px;
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

	.footer {
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
