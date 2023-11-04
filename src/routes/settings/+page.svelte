<script>
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { cardRules } from '$lib/stores';

	let mans = 4,
		mafias = 1,
		withDoctor = true,
		withCop = true,
		withKamikaze = false,
		withManiac = false,
		withSecurity = false,
		withLawyer = false;

	let isMount = false;
	$: {
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
		saveData(data);
	}

	function saveData(data) {
		if (!isMount) return;
		cardRules.set(data);
	}

	onMount(() => {
		if (!browser) return;
		try {
			let data = $cardRules;
			if (!data) return;
			mans = data.mans;
			mafias = data.mafias;
			withDoctor = data.withDoctor;
			withCop = data.withCop;
			withKamikaze = data.withKamikaze;
			withManiac = data.withManiac;
			withSecurity = data.withSecurity;
			withLawyer = data.withLawyer;
		} catch (e) {
			console.log(e);
		}

		isMount = true;
	});
</script>

<div class="settings-conteiner">
	<h2>Налаштування</h2>
	<div class="block-content">
		<h3>Кількість мирних: {mans}</h3>
		<input type="range" bind:value={mans} max="10" min="1" />
	</div>
	<div class="block-content">
		<h3>Кількість мафій: {mafias}</h3>
		<input type="range" bind:value={mafias} max="5" min="1" />
	</div>
	<span class="without-escape">
		<h3>Комісар:</h3>
		<input type="checkbox" bind:checked={withCop} />
	</span>
	<span class="without-escape">
		<h3>Лікар:</h3>
		<input type="checkbox" bind:checked={withDoctor} />
	</span>
	<span class="without-escape">
		<h3>Камікадзе:</h3>
		<input type="checkbox" bind:checked={withKamikaze} />
	</span>
	<span class="without-escape">
		<h3>Маньяк:</h3>
		<input type="checkbox" bind:checked={withManiac} />
	</span>
	<span class="without-escape">
		<h3>Охоронець:</h3>
		<input type="checkbox" bind:checked={withSecurity} />
	</span>
	<span class="without-escape">
		<h3>Адвокат:</h3>
		<input type="checkbox" bind:checked={withLawyer} />
	</span>

	<HomeBtn size={60} />
</div>

<style>
	.settings-conteiner {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		height: 100%;
		width: 100%;
		gap: 20px;
		background-color: #111;
		color: white;
		padding: 30px 10px;
	}

	.block-content {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}

	@media (min-width: 480px) {
		.block-content {
			flex-direction: row;
		}
	}

	.without-escape {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 15px;
	}

	.settings-conteiner h2 {
		color: white;
		font-size: 30px;
	}

	.settings-conteiner h3 {
		font-size: 20px;
		color: white;
	}
</style>
