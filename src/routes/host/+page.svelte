<script>
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
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
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';
	import { onMount } from 'svelte';

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

	let people = page.state?.peopleList ?? [];

	let night = 1;
	let showRules = false;

	let modalHeroTag = 'mans';
	let isModalOpen = false;

	onMount(() => {
		console.log(people);

		if (people.length > 0 && people[0]) {
			people = people.reverse().map(({ id, uniqId }) => ({
				id,
				uniqId,
				alive: true
			}));
		} else {
			goto('/');
		}
	});

	// ----- GAME SCRIPT -----
	let hostScript = [
		'Місто засинає',
		'Мафія прокидається',
		...findEnabledKeys().map((tag) => `${bigDescriptionList[tag].name} прокидається`),
		'Місто прокидається'
	];
</script>

{#if people.length > 0}
	<div class="host main-conteiner">
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
				<span>{showRules ? 'Скрий' : 'Покажи'}</span> правила гри
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
					<div class="player-name">
						<span class="index">{index + 1}</span>

						<span class="role"
							>{bigDescriptionList[cardList.find(({ id }) => id == p.id).tag].name}</span
						>
					</div>
					<div class="player-actions">
						<button
							class="icon"
							on:click={() => {
								modalHeroTag = cardList.find(({ id }) => id == p.id).tag;
								isModalOpen = true;
							}}
						>
							<CircleQuestionMark size="23" color={'#fff'} />
						</button>

						<button class="icon" on:click={() => toggleAlive(p)}>
							{#if p.alive}
								<Eye size="23" color={'#fff'} />
							{:else}
								<EyeOff size="23" color={'#fff'} />
							{/if}
						</button>

						<span class="drag">
							<GripVertical size="23" color={'#fff'} />
						</span>
					</div>
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
			heroTag={modalHeroTag}
			on:close={() => (isModalOpen = false)}
		/>

		<div class="home-btn">
			<HomeBtn size={50} />
		</div>
	</div>
{:else}
	Process data
{/if}

<style>
	.host {
		min-height: 100vh;
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

	.rules > button > span {
		color: #fff;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		padding: 8px;
		background: #141414;
		border-radius: 8px;
	}

	.player-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}

	.player.dead {
		opacity: 0.4;
		text-decoration: line-through;
	}

	.index {
		color: #fff;
		text-align: center;
		margin-right: 8px;
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

	.script h2 {
		color: #fff;
		font-size: 21px;
	}

	.script ol {
		padding-left: 20px;
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

	@media (max-width: 500px) {
		.host {
			padding: 16px 10px;
		}

		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}

		.header > h1 {
			padding-left: 4px;
		}

		.player {
			flex-direction: column;
			gap: 15px;
			align-items: flex-start;
		}

		.player-actions {
			gap: 18px;
			flex-direction: row-reverse;
		}

		.player-actions button {
			padding: 0;
		}
	}

	@media (max-width: 320px) {
		.rules > button > span {
			display: none;
		}

		.rules > button {
			text-transform: capitalize;
		}

		.script h2 {
			font-size: 18px;
		}

		.script li {
			margin-top: 12px;
			font-size: 16px;
		}
	}
</style>
