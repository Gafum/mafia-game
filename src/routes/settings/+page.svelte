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

	// Основні змінні
	let mans = 4;
	let mafias = 1;
	let withDoctor = true,
		withCop = true,
		withKamikaze = false,
		withManiac = false,
		withSecurity = false,
		withLawyer = false;

	let isMount = false;

	// Розрахунок загальної кількості
	$: totalPlayers =
		mans +
		mafias +
		(withDoctor ? 1 : 0) +
		(withCop ? 1 : 0) +
		(withKamikaze ? 1 : 0) +
		(withManiac ? 1 : 0) +
		(withSecurity ? 1 : 0) +
		(withLawyer ? 1 : 0);

	// Автоматичне збереження
	$: if (isMount) {
		let data = {
			mans,
			mafias,
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

	// Функція рандому (впливає на ВСЕ)
	function handleRandom() {
		// Рандомимо чекбокси
		withDoctor = Math.random() > 0.3;
		withCop = Math.random() > 0.3;
		withKamikaze = Math.random() > 0.7;
		withManiac = Math.random() > 0.6;
		withSecurity = Math.random() > 0.7;
		withLawyer = Math.random() > 0.8;

		// Рандомимо мафію (1-8) та мирних (4-15) для адекватного балансу
		mafias = Math.floor(Math.random() * 6) + 1;
		mans = Math.floor(Math.random() * 12) + 4;
	}

	// Валідація інпутів (щоб не ввели більше ліміту)
	function validateMans(val) {
		mans = Math.max(1, Math.min(24, val));
	}
	function validateMafias(val) {
		mafias = Math.max(1, Math.min(20, val));
	}

	onMount(() => {
		if (!browser) return;
		try {
			let data = $cardRules;
			if (data) {
				mans = data.mans || 4;
				mafias = data.mafias || 1;
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
		<header style="display:flex; flex-direction: column; gap:10px;">
			<h1><Annoyed color="#ff4444" size={32} /> НАЛАШТУВАННЯ ГРИ</h1>
			<div class="total-badge">
				<Users size={18} color="#ffffff" />
				<span>Гравців: {totalPlayers} / 50</span>
			</div>
		</header>

		<main class="content">
			<!-- Секція основних ролей -->
			<section class="base-roles">
				<div class="role-control">
					<div class="label-row">
						<label for="mans">Мирні жителі</label>
						<input
							type="number"
							bind:value={mans}
							on:input={(e) => validateMans(e.target.value)}
							min="1"
							max="24"
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
							type="number"
							bind:value={mafias}
							on:input={(e) => validateMafias(e.target.value)}
							min="1"
							max="20"
						/>
					</div>
					<input type="range" bind:value={mafias} min="1" max="20" class="red-slider" />
				</div>
			</section>

			<!-- Секція особливих ролей (Чекбокси) -->
			<div class="special-roles-grid">
				<label class="role-checkbox" class:active={withCop}>
					<input type="checkbox" bind:checked={withCop} />
					<div class="role-box-content">
						<Shield size={20} color="#ffffff" />
						<span>Комісар</span>
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

			<!-- Кнопка рандому -->
			<button class="random-btn" on:click={handleRandom}>
				<Zap color="#ff4444" size={20} fill="currentColor" />
				ЗГЕНЕРУВАТИ ВИПАДКОВО
			</button>
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
		margin-bottom: 30px;
		border-bottom: 1px solid #333;
		padding-bottom: 15px;
	}

	header h1 {
		color: #fff;
		font-size: 1.2rem;
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
		box-shadow: 0 0 15px rgba(139, 0, 0, 0.4);
	}

	.total-badge span {
		color: white;
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
		font-size: 1rem;
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
		box-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
	}

	/* Сітка чекбоксів */
	.special-roles-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 12px;
		margin-top: 30px;
	}

	.role-checkbox {
		cursor: pointer;
		position: relative;
	}

	.role-checkbox input {
		display: none;
	}

	.role-box-content {
		background: #1a1a1a;
		border: 1px solid #333;
		padding: 12px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: #777;
		transition: all 0.2s ease;
	}

	.role-box-content span {
		color: #fff;
	}

	.role-checkbox.active .role-box-content {
		border-color: #ff4444;
		color: #fff;
		background: rgba(255, 68, 68, 0.1);
		box-shadow: inset 0 0 10px rgba(255, 68, 68, 0.1);
	}

	/* Кнопка рандому */
	.random-btn {
		width: 100%;
		margin-top: 30px;
		background: transparent;
		border: 2px solid #ff4444;
		color: #ff4444;
		padding: 15px;
		border-radius: 8px;
		font-weight: bold;
		letter-spacing: 2px;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
		transition: all 0.3s;
	}

	.random-btn:hover {
		background: #ff4444;
		color: white;
		box-shadow: 0 0 20px rgba(255, 68, 68, 0.4);
	}

	.footer {
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	@media (max-width: 400px) {
		.special-roles-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
