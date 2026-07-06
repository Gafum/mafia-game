<script>
	import { onMount } from 'svelte';
	import { bigDescriptions } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte';
	import { Search, SlidersVertical, X, ArrowDownAZ, ArrowUpAZ } from 'lucide-svelte';

	let mounted = false;
	let searchQuery = '';
	let isModalOpen = false;

	// Teams: 'all' | 'peaceful' | 'mafia' | 'neutral' | 'custom'
	let activeTab = 'all';

	// Sorting
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

	// Check if there are any custom roles
	$: hasCustomRoles = allRoles.some((r) => r.team === 'custom');

	// Reset the 'custom' tab if there are no custom cards
	$: if (!hasCustomRoles && activeTab === 'custom') {
		activeTab = 'all';
	}

	// Visibility map (to not remove from DOM)
	$: visibilityMap = allRoles.reduce((acc, role) => {
		const matchesTeam = activeTab === 'all' || role.team === activeTab;
		const q = searchQuery.toLowerCase().trim();
		const matchesSearch =
			!q || role.name.toLowerCase().includes(q) || role.description.toLowerCase().includes(q);

		acc[role.id] = matchesTeam && matchesSearch;
		return acc;
	}, {});

	// Count of visible elements for "Empty state"
	$: visibleCount = Object.values(visibilityMap).filter(Boolean).length;

	// Order map
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

	// Helper for sorting in modal
	function setSort(field) {
		if (sortField === field) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDir = 'asc';
		}
	}

	function clearSearch() {
		searchQuery = '';
	}
</script>

<div class="main-conteiner roles-conteiner">
	{#if mounted}
		<div class="controls-bar" in:fade={{ duration: 200 }}>
			<!-- Search + Filters Button -->
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
					<SlidersVertical class="filter-icon" />
				</button>
			</div>
		</div>

		<div class="cards-list-wrapper" in:fade={{ duration: 200 }}>
			{#if visibleCount === 0}
				<!-- Empty state without emoji -->
				<div class="empty-state" in:fade={{ duration: 150 }}>
					<p>
						Нічого не знайдено {#if searchQuery}за запитом <strong>{searchQuery}</strong>{/if}
					</p>
				</div>
			{/if}

			<!-- Render ALL cards, but control visibility via CSS to preserve state -->
			{#each allRoles as role (role.id)}
				<div
					class="role-item-wrapper"
					style="display: {visibilityMap[role.id] ? 'flex' : 'none'}; order: {orderMap[role.id]};"
				>
					<CardWithText tag={role.id} isFirst={orderMap[role.id] === 0} />
				</div>
			{/each}

			<div
				style="order: 9999; display: flex; flex-direction: column; align-items: center; width: 100%; margin-top: 20px;"
			>
				<SimpleLink href="/custom-cards" props={{ style: 'margin-bottom: 20px;' }}
					>Нові картки</SimpleLink
				>
				<StandardLinks size={75} blockStyles="max-width: 280px;" />
			</div>
		</div>
	{/if}
</div>

<!-- Modal with Filters and Sorting -->
<BaseModal bind:open={isModalOpen} on:close={() => (isModalOpen = false)}>
	<h3 slot="header" class="modal-title">Фільтри</h3>

	<div class="modal-content-blocks">
		<!-- Teams Block -->
		<div class="modal-section">
			<span class="section-label">Показати ролі:</span>
			<div class="filter-chips">
				<button class="chip" class:active={activeTab === 'all'} on:click={() => (activeTab = 'all')}
					>Всі</button
				>
				<button
					class="chip"
					class:active={activeTab === 'peaceful'}
					on:click={() => (activeTab = 'peaceful')}>Мирні</button
				>
				<button
					class="chip"
					class:active={activeTab === 'mafia'}
					on:click={() => (activeTab = 'mafia')}>Мафія</button
				>
				<button
					class="chip"
					class:active={activeTab === 'neutral'}
					on:click={() => (activeTab = 'neutral')}>Нейтральні</button
				>
				{#if hasCustomRoles}
					<button
						class="chip"
						class:active={activeTab === 'custom'}
						on:click={() => (activeTab = 'custom')}>Мої ролі</button
					>
				{/if}
			</div>
		</div>

		<!-- Sorting Block -->
		<div class="modal-section">
			<span class="section-label">Сортування:</span>
			<div class="sort-list">
				<button
					class="sort-row-btn"
					class:active={sortField === 'default'}
					on:click={() => setSort('default')}
				>
					За важливістю (дефолт)
					<span class="sort-arrow" class:visible={sortField === 'default'}>
						{#if sortDir === 'asc'}<ArrowDownAZ />
						{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
				<button
					class="sort-row-btn"
					class:active={sortField === 'name'}
					on:click={() => setSort('name')}
				>
					За назвою
					<span class="sort-arrow" class:visible={sortField === 'name'}>
						{#if sortDir === 'asc'}<ArrowDownAZ />
						{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
				<button
					class="sort-row-btn"
					class:active={sortField === 'description'}
					on:click={() => setSort('description')}
				>
					За описом
					<span class="sort-arrow" class:visible={sortField === 'description'}>
						{#if sortDir === 'asc'}<ArrowDownAZ />
						{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
			</div>
		</div>
	</div>
</BaseModal>

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
		background: #111113;
		border: 1px solid #343434;
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
		border-color: #52525b;
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
		background: #111113;
		border: 1px solid #343434;
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

	.filter-trigger-btn:hover {
		background: #18181b;
		border-color: #3f3f46;
		color: #fff;
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

	.modal-title {
		font-size: 23px;
		color: #fff;
	}

	.modal-content-blocks {
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin-top: 16px;
	}

	.modal-section {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.section-label {
		color: #dddddd;
		font-size: 14px;
	}

	.filter-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.chip {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		padding: 8px 16px;
		color: #d4d4d8;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.chip.active {
		background: #ffffff;
		color: #000000;
		border-color: #ffffff;
		font-weight: 600;
	}

	.sort-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 14px;
		padding: 8px;
	}

	.sort-row-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background: transparent;
		border: none;
		padding: 12px 14px;
		color: #a1a1aa;
		font-size: 0.95rem;
		border-radius: 8px;
		cursor: pointer;
		text-align: left;
		transition: background 0.2s, color 0.2s;
	}

	.sort-row-btn.active {
		background: rgba(255, 255, 255, 0.08);
		color: #ffffff;
		font-weight: 500;
	}

	.sort-arrow {
		opacity: 0;
		font-weight: bold;
	}

	.sort-arrow.visible {
		opacity: 1;
	}

	@media (max-width: 720px) {
		.controls-bar {
			width: 100%;
			margin-bottom: 16px;
		}
	}
</style>
