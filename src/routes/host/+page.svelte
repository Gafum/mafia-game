<script>
	import { onMount } from 'svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import { cardRules } from '$lib/stores';
	import { cardList } from '$lib/data';
	import { cardRulesConst, bigDescriptionList, gameRules } from '$lib/data';
	import PlayerRow from './PlayerRow.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/state';

	console.log(page.state.peopleList);

	let night = 1;
	let showRules = false;
	let players = page.state.peopleList.reverse();
	let activeDrag = null;
	let hoverIndex = null;
	let settings = { ...cardRulesConst };

	function toggleStatus(index) {
		players = players.map((player, idx) =>
			idx === index ? { ...player, alive: !player.alive } : player
		);
	}

	function handleDragStart(event, index) {
		activeDrag = index;
		event.dataTransfer?.setData('text/plain', String(index));
		event.dataTransfer?.setDragImage(new Image(), 0, 0);
	}

	function handleDragOver(event, index) {
		event.preventDefault();
		hoverIndex = index;
	}

	function handleDrop(event, index) {
		event.preventDefault();
		const from =
			activeDrag !== null ? activeDrag : Number(event.dataTransfer?.getData('text/plain'));
		const to = index;
		if (from === to || from < 0 || to < 0) return;
		const updated = [...players];
		const [moved] = updated.splice(from, 1);
		updated.splice(to, 0, moved);
		players = updated.map((item, idx) => ({ ...item, playerIndex: idx + 1 }));
		activeDrag = null;
		hoverIndex = null;
	}

	function handleDragEnd() {
		activeDrag = null;
		hoverIndex = null;
	}

	$: scriptSteps = [
		{ text: 'Місто занурюється в сон. Не світити очима, не говорити.' },
		settings.mafias > 0 ? { text: `Мафія прокидається. Члени мафії обирають жертву.` } : null,
		settings.cop
			? { text: `Шериф прокидається. Визначає, хто з гравців може бути мафіозі.` }
			: null,
		settings.doctor ? { text: `Лікар прокидається. Обирає, кого захистити цієї ночі.` } : null,
		settings.security
			? { text: `Охоронець прокидається. Може захистити одного гравця, але ризикує.` }
			: null,
		settings.lawyer ? { text: `Адвокат прокидається. Обирає гравця для захисту від лінчу.` } : null,
		settings.maniac
			? { text: `Маньяк прокидається. Обирає свою жертву серед усіх гравців.` }
			: null,
		settings.kamikaze ? { text: `Камікадзе прокидається. Готує свій останній вибір.` } : null,
		{ text: 'Місто прокидається. Гравці обговорюють нічні події та голосують.' }
	].filter(Boolean);

	$: enabledRoleCards = ['mafias', 'cop', 'doctor', 'security', 'lawyer', 'maniac', 'kamikaze']
		.filter((key) => settings[key] || key === 'mafias')
		.map((key) => ({
			key,
			...bigDescriptionList[key],
			enabled: key === 'mafias' || settings[key]
		}));

	onMount(() => {
		if (!browser) return;
		try {
			const data = $cardRules ?? cardRulesConst;
			settings = { ...cardRulesConst, ...data };
		} catch (error) {
			settings = { ...cardRulesConst };
		}
	});
</script>

<div class="host-screen">
	<div class="host-header">
		<div>
			<p class="eyebrow">Moderator</p>
			<h1>Host Panel</h1>
			<p class="subtitle">Manage nights, players and the story flow.</p>
		</div>

		<div class="header-actions">
			<button class="secondary-button" type="button" on:click={() => night++}> + Add Night </button>
			<div class="night-badge">Night {night}</div>
			<HomeBtn size={44} />
		</div>
	</div>

	<section class="rules-card">
		<button class="rules-toggle" type="button" on:click={() => (showRules = !showRules)}>
			<span>{showRules ? 'Hide Rules' : 'Show Rules'}</span>
			<span class="toggle-pill">{showRules ? '–' : '+'}</span>
		</button>

		{#if showRules}
			<div class="rules-panel">
				<div class="rules-summary">
					{#each gameRules as rule}
						<div class="rule-item">
							<strong>{rule.title}</strong>
							<p>{rule.description}</p>
						</div>
					{/each}
				</div>

				<div class="enabled-roles">
					<h2>Enabled Roles</h2>
					<div class="role-grid">
						{#each enabledRoleCards as role}
							<article class="role-card">
								<div class="role-card-icon">
									<svelte:component this={role.icon} size="22" />
								</div>
								<div>
									<h3>{role.name}</h3>
									<p>{role.description}</p>
								</div>
							</article>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</section>

	<div class="main-grid">
		<section class="players-panel">
			<div class="panel-title">
				<div>
					<p class="eyebrow">Players</p>
					<h2>{players.length} Participants</h2>
				</div>
				<p class="hint">
					Drag to reorder the turn order. Toggle status to mark eliminated players.
				</p>
			</div>

			<div class="players-list">
				{#each players as player, index}
					<PlayerRow
						player={cardList.find(({ id }) => id == player.id)}
						{index}
						alive={player.alive}
						isDragging={activeDrag === index}
						isDragOver={hoverIndex === index}
						onToggle={toggleStatus}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
						onDragEnd={handleDragEnd}
					/>
				{/each}
			</div>
		</section>

		<aside class="script-panel">
			<div class="panel-title">
				<p class="eyebrow">Host Script</p>
				<h2>Narrative Flow</h2>
			</div>

			<div class="script-list">
				{#each scriptSteps as step, idx}
					<div class="script-step">
						<span class="step-number">{idx + 1}</span>
						<p>{step.text}</p>
					</div>
				{/each}
			</div>
		</aside>
	</div>
</div>

<style>
	:global(body) {
		background: radial-gradient(circle at top, #240909 0%, #050505 60%, #050505 100%);
	}

	.host-screen {
		min-height: 100vh;
		padding: 28px 24px 32px;
		color: #f4f4f4;
		font-family: system-ui, sans-serif;
	}

	.host-header {
		display: flex;
		justify-content: space-between;
		gap: 18px;
		align-items: flex-start;
		margin-bottom: 28px;
		flex-wrap: wrap;
	}

	.host-header h1 {
		margin: 6px 0 8px;
		font-size: clamp(2.2rem, 3vw, 3rem);
		letter-spacing: 0.02em;
	}

	.eyebrow {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.22em;
		font-size: 0.78rem;
		color: #ff6868;
	}

	.subtitle {
		margin: 0;
		opacity: 0.8;
		max-width: 520px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 14px;
		flex-wrap: wrap;
	}

	.secondary-button {
		border: none;
		border-radius: 16px;
		padding: 14px 18px;
		background: linear-gradient(135deg, rgba(255, 91, 91, 0.25), rgba(175, 15, 15, 0.22));
		color: #fff;
		font-weight: 700;
		cursor: pointer;
		box-shadow: 0 12px 30px rgba(255, 84, 84, 0.12);
	}

	.night-badge {
		border-radius: 999px;
		padding: 12px 18px;
		background: rgba(255, 255, 255, 0.05);
		color: #ffbbbb;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.rules-card {
		margin-bottom: 24px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 24px;
		background: rgba(12, 12, 14, 0.92);
		overflow: hidden;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
	}

	.rules-toggle {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 18px 22px;
		border: none;
		background: transparent;
		color: #f4f4f4;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
	}

	.toggle-pill {
		min-width: 44px;
		height: 44px;
		border-radius: 999px;
		display: grid;
		place-items: center;
		background: rgba(255, 91, 91, 0.16);
		color: #ffbbbb;
		font-weight: 700;
	}

	.rules-panel {
		display: grid;
		gap: 20px;
		padding: 0 22px 22px;
		border-top: 1px solid rgba(255, 255, 255, 0.05);
	}

	.rules-summary {
		display: grid;
		gap: 16px;
	}

	.rule-item {
		display: grid;
		gap: 8px;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.03);
		padding: 16px 18px;
	}

	.rule-item strong {
		font-size: 0.98rem;
		color: #fff;
	}

	.rule-item p {
		margin: 0;
		color: #c9c9d1;
		line-height: 1.6;
	}

	.enabled-roles {
		display: grid;
		gap: 14px;
	}

	.enabled-roles h2 {
		margin: 0;
		font-size: 1rem;
		color: #fdf0d7;
	}

	.role-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 14px;
	}

	.role-card {
		padding: 16px;
		display: grid;
		gap: 12px;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.role-card-icon {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.08);
		color: #f8d76d;
	}

	.role-card h3 {
		margin: 0;
		font-size: 1rem;
	}

	.role-card p {
		margin: 0;
		color: #d2d2db;
		font-size: 0.92rem;
		line-height: 1.5;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 1.8fr 1fr;
		gap: 24px;
	}

	.players-panel,
	.script-panel {
		border-radius: 24px;
		background: rgba(10, 10, 12, 0.92);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
		padding: 22px;
	}

	.panel-title {
		display: grid;
		gap: 10px;
		margin-bottom: 18px;
	}

	.panel-title h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.hint {
		margin: 0;
		font-size: 0.95rem;
		color: #b9b9c2;
		opacity: 0.85;
	}

	.players-list {
		display: grid;
		gap: 14px;
	}

	.script-list {
		display: grid;
		gap: 14px;
	}

	.script-step {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 16px;
		align-items: center;
		padding: 18px;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.07);
	}

	.step-number {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		background: rgba(255, 91, 91, 0.17);
		color: #ffd5d5;
		font-weight: 700;
	}

	.script-step p {
		margin: 0;
		color: #dcdce6;
		line-height: 1.6;
	}

	@media (max-width: 1120px) {
		.main-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 820px) {
		.host-header {
			align-items: stretch;
		}

		.header-actions {
			justify-content: flex-start;
		}
	}

	@media (max-width: 680px) {
		.host-screen {
			padding: 18px 16px 22px;
		}

		.rules-toggle {
			padding: 16px 18px;
		}

		.players-panel,
		.script-panel {
			padding: 18px;
		}

		.script-step {
			grid-template-columns: 1fr;
		}

		.step-number {
			justify-self: start;
		}
	}

	@media (max-width: 520px) {
		.secondary-button,
		.night-badge {
			width: 100%;
			justify-content: center;
		}

		.header-actions {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
