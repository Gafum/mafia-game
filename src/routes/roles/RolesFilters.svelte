<script>
	import { onMount } from 'svelte';
	import { bigDescriptions } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import FilterModal from './FilterModal.svelte';
	import { Search, SlidersHorizontal, X } from 'lucide-svelte';

	let mounted = false;
	let searchQuery = '';
	let isModalOpen = false;

	let activeTab = 'all';
	let sortField = 'default';
	let sortDir = 'asc';
	let allRoles = [];

	bigDescriptions.subscribe(($desc) => {
		allRoles = Object.entries($desc).map(([id, data], index) => ({
			id,
			name: data.name || id,
			description: data.description || '',
			team: id.startsWith('custom_') ? 'custom' : data.team || 'peaceful',
			originalIndex: index
		}));
	});

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	$: hasCustomRoles = allRoles.some((r) => r.team === 'custom');

	$: if (!hasCustomRoles && activeTab === 'custom') {
		activeTab = 'all';
	}

	$: visibilityMap = allRoles.reduce((acc, role) => {
		const matchesTeam = activeTab === 'all' || role.team === activeTab;
		const q = searchQuery.toLowerCase().trim();
		const matchesSearch =
			!q || role.name.toLowerCase().includes(q) || role.description.toLowerCase().includes(q);

		acc[role.id] = matchesTeam && matchesSearch;
		return acc;
	}, {});

	$: visibleCount = Object.values(visibilityMap).filter(Boolean).length;

	$: orderMap = [...allRoles]
		.sort((a, b) => {
			let cmp = 0;
			if (sortField === 'default') {
				cmp = a.originalIndex - b.originalIndex;
			} else {
				const valA = (a[sortField] || '').toLowerCase();
				const valB = (b[sortField] || '').toLowerCase();
				cmp = valA.localeCompare(valB, 'uk');
			}
			return sortDir === 'asc' ? cmp : -cmp;
		})
		.reduce((acc, role, index) => {
			acc[role.id] = index;
			return acc;
		}, {});

	function clearSearch() {
		searchQuery = '';
	}
</script>

<div class="main-conteiner roles-conteiner">
	{#if mounted}
		<div class="controls-bar" in:fade={{ duration: 200 }}>
			<div class="search-row">
				<div class="search-wrapper">
					<Search class="search-icon" size={16} stroke-width={2} />
					<input
						id="roles-search"
						type="search"
						class="search-input"
						placeholder="Пошук..."
						bind:value={searchQuery}
					/>
					{#if searchQuery}
						<button class="clear-btn" on:click={clearSearch} aria-label="Очистити пошук">
							<X class="clear-icon" />
						</button>
					{/if}
				</div>

				<button class="filter-trigger-btn" on:click={() => (isModalOpen = true)}>
					<SlidersHorizontal class="filter-icon" />
				</button>
			</div>
		</div>

		<div class="cards-list-wrapper" in:fade={{ duration: 200 }}>
			{#if visibleCount === 0}
				<div class="empty-state" in:fade={{ duration: 150 }}>
					<p>
						Нічого не знайдено {#if searchQuery}за запитом <strong>{searchQuery}</strong>{/if}
					</p>
				</div>
			{/if}

			{#each allRoles as role (role.id)}
				<div
					class="role-item-wrapper"
					style="display: {visibilityMap[role.id] ? 'flex' : 'none'}; order: {orderMap[role.id]};"
				>
					<CardWithText tag={role.id} isFirst={orderMap[role.id] === 0} />
				</div>
			{/each}

			<div class="footer-links-block">
				<SimpleLink href="/custom-cards" props={{ style: 'margin-bottom: 20px;' }}>
					Нові картки
				</SimpleLink>
				<StandardLinks size={75} blockStyles="max-width: 280px;" />
			</div>
		</div>
	{/if}
</div>

<FilterModal bind:isModalOpen bind:activeTab bind:sortField bind:sortDir {hasCustomRoles} />

<style>
	.roles-conteiner {
		padding: 16px 16px 40px;
		height: auto;
	}

	.controls-bar {
		margin-bottom: 24px;
		width: 85vw;
		margin-left: auto;
		margin-right: auto;
	}

	.search-row {
		display: flex;
		gap: 12px;
		align-items: center;
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		flex-grow: 1;
	}

	:global(.search-icon) {
		position: absolute;
		left: 12px;
		color: #71717a;
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		background: #1a1a1a;
		border: 1px solid #333;
		border-radius: 12px;
		padding: 12px 36px 12px 40px;
		color: #ffffff;
		font-size: 1rem;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.2s;
		-webkit-appearance: none;
		appearance: none;
	}

	.search-input:focus {
		border-color: #ff4444;
	}

	.search-input::placeholder {
		color: #52525b;
	}
	.search-input::-webkit-search-cancel-button {
		display: none;
	}

	.clear-btn {
		position: absolute;
		right: 12px;
		background: transparent;
		border: none;
		color: #71717a;
		cursor: pointer;
		padding: 4px;
		font-size: 0.9rem;
	}

	.filter-trigger-btn {
		background: #1a1a1a;
		border: 1px solid #333;
		border-radius: 12px;
		color: #a1a1aa;
		padding: 0 14px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s;
	}

	.filter-trigger-btn:active {
		transform: scale(0.97);
		filter: brightness(0.85);
	}

	.cards-list-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 16px;
	}

	.role-item-wrapper {
		width: 100%;
		justify-content: center;
	}

	.empty-state {
		padding: 40px 20px;
		text-align: center;
		width: 100%;
	}

	.empty-state p {
		color: #ffffff;
		font-size: 20px;
	}
	.empty-state p strong {
		color: #ff6b6b;
		font-weight: bold;
		font-size: 22px;
	}

	.footer-links-block {
		order: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin-top: 20px;
	}

	@media (hover: hover) {
		.filter-trigger-btn:hover {
			box-shadow: 0 0 5px 1px #ff444466;
		}
	}

	@media (max-width: 720px) {
		.controls-bar {
			width: 100%;
			margin-bottom: 16px;
		}
	}
</style>
