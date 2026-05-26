<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { cardRules, setCookie } from '$lib/stores';
	import { generateGame } from '$lib/functions/settingsRandomizer';
	import { cardRulesConst, bigDescriptionList } from '$lib/data';
	import { findSpecialKeys } from '$lib/functions/findSpecialKeys';

	import RoleSlider from './RoleSlider.svelte';
	import SpecialRoleToggle from './SpecialRoleToggle.svelte';
	import PlayerGenerator from './PlayerGenerator.svelte';
	import SettingsHeader from './SettingsHeader.svelte';
	import LinksBlock from './LinksBlock.svelte';

	let state = { ...cardRulesConst };
	let isMount = false;
	let renderContent = false;

	const specialKeys = findSpecialKeys();

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

	onMount(() => {
		if (!browser) return;

		let data = $cardRules;
		if (data) {
			state = { ...cardRulesConst, ...data };
		}

		isMount = true;
		setTimeout(() => {
			renderContent = true;
		}, 100);
	});

	const handleRandom = (targetTotal) => {
		state = generateGame(targetTotal);
	};
</script>

<div class="main-conteiner mafia-setup-screen">
	<div class="setup-card">
		<SettingsHeader {totalPlayers} />

		<main>
			{#if renderContent}
				<div in:fade={{ duration: 200 }}>
					<PlayerGenerator {handleRandom} {totalPlayers} />

					<section class="base-roles">
						<RoleSlider
							label="Мирні жителі"
							bind:value={state.mans}
							max={cardRulesConst.mans}
							min={1}
						/>

						<RoleSlider label="Мафія" bind:value={state.mafias} max={cardRulesConst.mafias} min={0} />
					</section>

					<div class="special-roles-grid">
						{#each specialKeys as key}
							<SpecialRoleToggle bind:active={state[key]} roleData={bigDescriptionList[key]} />
						{/each}
					</div>
				</div>
			{/if}
		</main>

		<LinksBlock settingsState={state} />
	</div>
</div>

<style>
	.mafia-setup-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		min-height: 100lvh;
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
		padding: 25px;
	}

	.special-roles-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 10px;
		margin-top: 20px;
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
			min-height: 100vh;
			min-height: 100lvh;
		}
		.special-roles-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
