<script>
	import { page } from '$app/state';
	import { cardList, gameRules, bigDescriptionList } from '$lib/data';
	import { cardRules } from '$lib/stores';
	import { findSpecialKeys } from '$lib/functions/findSpecialKeys';
	import {
		Users,
		Moon,
		Plus,
		Eye,
		EyeOff,
		CircleQuestionMark,
		GripVertical,
		BookOpen
	} from 'lucide-svelte';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
	import RoleDetailsModal from '../play/RoleDetailsModal.svelte';

	export function findEnabledKeys() {
		return findSpecialKeys().filter((tag) => Boolean($cardRules[tag]));
	}

	function toggleAlive({ uniqId }) {
		let myIndex = people.findIndex(({ uniqId: personId }) => personId == uniqId);
		people[myIndex].alive = !people[myIndex].alive;
	}

	function addNight() {
		night++;
	}

	let people = page.state?.peopleList.reverse() ?? [];

	let night = 1;
	let showRules = false;

	let modalHeroId = 'mans';
	let isModalOpen = false;

	people = people.map(({ id, uniqId }) => ({
		id,
		uniqId,
		alive: true
	}));

	// ----- GAME SCRIPT -----
	let hostScript = [
		'Місто засинає',
		'Мафія прокидається',
		...findEnabledKeys().map((tag) => `${bigDescriptionList[tag].name} прокидається ... засинає`),
		'Місто прокидається'
	];
</script>

<div class="host">
	<!-- HEADER -->
	<header class="header">
		<h1><Users size="22" color={'#fff'} /> Панель ведучого</h1>

		<div class="night">
			<button on:click={addNight}>
				<Moon size="18" color={'#fff'} />
				Ніч {night}
				<Plus size="16" color={'#fff'} />
			</button>
		</div>
	</header>

	<!-- RULES -->
	<section class="rules">
		<button on:click={() => (showRules = !showRules)}>
			<BookOpen size="16" color={'#fff'} />
			{showRules ? 'Скрий' : 'Покажи'} правила гри
		</button>

		{#if showRules}
			<ol class="rules-list">
				{#each gameRules as { title, description }}
					<li>
						<span>{title}: </span>{description}
					</li>
				{/each}
			</ol>
		{/if}
	</section>

	<!-- PLAYERS -->
	<section class="players">
		<h2>Гравці</h2>

		{#each people as p, index (p.uniqId)}
			<div class="player {p.alive ? '' : 'dead'}">
				<span class="index">{index + 1}</span>

				<span class="role">{cardList.find(({ id }) => id == p.id).name}</span>

				<button
					class="icon"
					on:click={() => {
						modalHeroId = p.role;
						isModalOpen = true;
					}}
				>
					<CircleQuestionMark size="16" color={'#fff'} />
				</button>

				<button class="icon" on:click={() => toggleAlive(p)}>
					{#if p.alive}
						<Eye size="16" color={'#fff'} />
					{:else}
						<EyeOff size="16" color={'#fff'} />
					{/if}
				</button>

				<span class="drag">
					<GripVertical size="16" color={'#fff'} />
				</span>
			</div>
		{/each}
	</section>

	<!-- HOST SCRIPT -->
	<section class="script">
		<h2>Слова ведучого</h2>
		<ol>
			{#each hostScript as line}
				<li>{line}</li>
			{/each}
		</ol>
	</section>

	<RoleDetailsModal
		open={isModalOpen}
		heroId={modalHeroId}
		on:close={() => (isModalOpen = false)}
	/>

	<div class="home-btn">
		<HomeBtn size={50} />
	</div>
</div>

<style>
	.host {
		min-height: 100vh;
		background: #0e0e0e;
		color: #fff;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.header {
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header h1 {
		color: #fff;
		display: flex;
		gap: 8px;
		font-size: 20px;
	}

	.night {
		color: #fff;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	button {
		background: #1a1a1a;
		color: #fff;
		border: 1px solid #333;
		padding: 6px 10px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.players {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.players > h2 {
		color: #fff;
		margin-bottom: 10px;
		font-size: 26px;
	}

	.player {
		display: grid;
		grid-template-columns: 30px 1fr auto auto auto;
		align-items: center;
		gap: 8px;
		padding: 8px;
		background: #141414;
		border-radius: 8px;
	}

	.player.dead {
		opacity: 0.4;
		text-decoration: line-through;
	}

	.index {
		color: #fff;
		text-align: center;
	}

	.role {
		color: #fff;
	}

	.icon {
		background: none;
		border: none;
		color: #fff;
	}

	.drag {
		opacity: 0.4;
	}

	.script {
		color: #fff;
		background: #121212;
		padding: 12px;
		border-radius: 8px;
	}

	.script ol {
		padding-left: 20px;
	}

	.script h2 {
		color: #fff;
	}

	.script li {
		margin-top: 15px;
		color: #fff;
	}

	.home-btn {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 25px;
	}

	@media (max-width: 600px) {
		.player {
			grid-template-columns: 24px 1fr auto auto;
		}
	}
</style>
