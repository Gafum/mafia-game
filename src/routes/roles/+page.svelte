<script>
	import { onMount } from 'svelte';
	import { bigDescriptions } from '$lib/stores';
	import { fade } from 'svelte/transition';
	import CardWithText from './CardWithText.svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';

	// --- State ---
	let mounted = false;
	let searchQuery = '';
	let sortField = 'name';    // 'name' | 'description'
	let sortDir = 'asc';       // 'asc' | 'desc'

	// Full flat list of roles: [{ id, name, description, team }]
	let allRoles = [];

	// Subscribe to bigDescriptions and build the flat role list
	bigDescriptions.subscribe(($desc) => {
		allRoles = Object.entries($desc).map(([id, data]) => ({
			id,
			name: data.name || id,
			description: data.description || '',
			// Determine team: custom_ prefix always overrides to 'custom'
			team: id.startsWith('custom_') ? 'custom' : (data.team || 'peaceful')
		}));
	});

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	// --- Reactive: filter by search query (name or description) ---
	$: filtered = allRoles.filter((role) => {
		if (!searchQuery.trim()) return true;
		const q = searchQuery.toLowerCase();
		return (
			role.name.toLowerCase().includes(q) ||
			role.description.toLowerCase().includes(q)
		);
	});

	// --- Reactive: sort the filtered list ---
	$: sorted = [...filtered].sort((a, b) => {
		const valA = (a[sortField] || '').toLowerCase();
		const valB = (b[sortField] || '').toLowerCase();
		const cmp = valA.localeCompare(valB, 'uk');
		return sortDir === 'asc' ? cmp : -cmp;
	});

	// --- Group definitions (order matters for rendering) ---
	const GROUPS = [
		{ key: 'peaceful', label: 'Команда мирних', color: '#4ade80', bg: 'rgba(74,222,128,0.08)' },
		{ key: 'mafia',    label: 'Команда мафії',  color: '#ef4444', bg: 'rgba(239,68,68,0.08)'  },
		{ key: 'neutral',  label: 'Самі за себе',   color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
		{ key: 'custom',   label: 'Свої створені ролі', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' }
	];

	// --- Reactive: bucket roles into groups, keeping sort order within each group ---
	$: groups = GROUPS.map((g) => ({
		...g,
		roles: sorted.filter((r) => r.team === g.key)
	})).filter((g) => g.roles.length > 0); // hide empty groups

	// --- Helper to toggle sort direction or switch field ---
	function setSort(field) {
		if (sortField === field) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDir = 'asc';
		}
	}

	// --- Helper to clear the search input ---
	function clearSearch() {
		searchQuery = '';
	}
</script>

<div class="main-conteiner roles-conteiner">
	{#if mounted}
		<div class="controls-bar" in:fade={{ duration: 200 }}>
			<!-- Search input -->
			<div class="search-wrapper">
				<svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
				</svg>
				<input
					id="roles-search"
					type="search"
					class="search-input"
					placeholder="Пошук за назвою або описом..."
					bind:value={searchQuery}
				/>
				{#if searchQuery}
					<button class="clear-btn" on:click={clearSearch} aria-label="Очистити пошук">✕</button>
				{/if}
			</div>

			<!-- Sort controls -->
			<div class="sort-group">
				<span class="sort-label">Сортування:</span>
				<button
					id="sort-name-btn"
					class="sort-btn"
					class:active={sortField === 'name'}
					on:click={() => setSort('name')}
				>
					Назва
					<span class="sort-arrow" class:visible={sortField === 'name'}>
						{sortDir === 'asc' ? '↑' : '↓'}
					</span>
				</button>
				<button
					id="sort-desc-btn"
					class="sort-btn"
					class:active={sortField === 'description'}
					on:click={() => setSort('description')}
				>
					Опис
					<span class="sort-arrow" class:visible={sortField === 'description'}>
						{sortDir === 'asc' ? '↑' : '↓'}
					</span>
				</button>
			</div>
		</div>

		<div class="cards-list-wrapper" in:fade={{ duration: 200 }}>
			{#if groups.length === 0}
				<!-- Empty state when search returns nothing -->
				<div class="empty-state" in:fade={{ duration: 150 }}>
					<span class="empty-icon">🔍</span>
					<p>Нічого не знайдено за запитом <strong>«{searchQuery}»</strong></p>
				</div>
			{:else}
				{#each groups as group (group.key)}
					<!-- Group section with colored header -->
					<section
						class="role-group"
						style="--group-color: {group.color}; --group-bg: {group.bg};"
						in:fade={{ duration: 200 }}
					>
						<div class="group-header">
							<span class="group-dot"></span>
							<h2 class="group-title">{group.label}</h2>
							<span class="group-count">{group.roles.length}</span>
						</div>

						<!-- Cards for this group; isFirst only applies to the very first card across all groups -->
						{#each group.roles as role, idx (role.id)}
							<CardWithText tag={role.id} isFirst={groups[0].roles[0]?.id === role.id} />
						{/each}
					</section>
				{/each}
			{/if}

			<SimpleLink href="/custom-cards" props={{ style: '' }}>Нові картки</SimpleLink>
			<StandardLinks size={75} blockStyles="max-width: 280px;" />
		</div>
	{/if}
</div>

<style>
	.roles-conteiner {
		padding: 16px 16px 40px;
		height: auto;
	}

	/* ─── Controls bar ─────────────────────────────────────── */
	.controls-bar {
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 20px;
		width: 100%;
		max-width: 700px;
		margin-left: auto;
		margin-right: auto;
	}

	.search-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-icon {
		position: absolute;
		left: 12px;
		color: #71717a;
		pointer-events: none;
		flex-shrink: 0;
	}

	.search-input {
		width: 100%;
		background: #111113;
		border: 1px solid #232326;
		border-radius: 10px;
		padding: 10px 36px 10px 38px;
		color: #ffffff;
		font-size: 0.95rem;
		outline: none;
		box-sizing: border-box;
		transition: border-color 0.2s, box-shadow 0.2s;
		/* Remove browser-default search input styling */
		-webkit-appearance: none;
		appearance: none;
	}

	.search-input:focus {
		border-color: #ff4444;
		box-shadow: 0 0 0 3px rgba(255, 68, 68, 0.12);
	}

	.search-input::placeholder {
		color: #52525b;
	}

	/* Remove the native × button on search inputs */
	.search-input::-webkit-search-cancel-button {
		display: none;
	}

	.clear-btn {
		position: absolute;
		right: 10px;
		background: transparent;
		border: none;
		color: #71717a;
		cursor: pointer;
		padding: 4px;
		font-size: 0.85rem;
		line-height: 1;
		transition: color 0.15s;
	}

	.clear-btn:hover {
		color: #ff4444;
	}

	/* Sort row */
	.sort-group {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-wrap: wrap;
	}

	.sort-label {
		color: #71717a;
		font-size: 0.8rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.sort-btn {
		display: flex;
		align-items: center;
		gap: 4px;
		background: #111113;
		border: 1px solid #232326;
		border-radius: 8px;
		color: #a1a1aa;
		padding: 6px 12px;
		font-size: 0.82rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.15s;
	}

	.sort-btn:hover {
		border-color: #3f3f46;
		color: #ffffff;
	}

	.sort-btn.active {
		background: rgba(255, 68, 68, 0.1);
		border-color: #ff4444;
		color: #ff4444;
	}

	.sort-arrow {
		opacity: 0;
		font-size: 0.9rem;
		transition: opacity 0.15s;
	}

	.sort-arrow.visible {
		opacity: 1;
	}

	/* ─── Cards list wrapper ───────────────────────────────── */
	.cards-list-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	/* ─── Group section ────────────────────────────────────── */
	.role-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 16px;
		border-radius: 14px;
		border: 1px solid color-mix(in srgb, var(--group-color) 25%, transparent);
		background: var(--group-bg);
		box-sizing: border-box;
	}

	.group-header {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		margin-bottom: 4px;
	}

	.group-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--group-color);
		flex-shrink: 0;
		box-shadow: 0 0 6px var(--group-color);
	}

	.group-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--group-color);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.group-count {
		margin-left: auto;
		background: color-mix(in srgb, var(--group-color) 15%, transparent);
		color: var(--group-color);
		font-size: 0.75rem;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 20px;
		border: 1px solid color-mix(in srgb, var(--group-color) 30%, transparent);
	}

	/* ─── Empty state ──────────────────────────────────────── */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 40px 20px;
		color: #71717a;
		text-align: center;
	}

	.empty-icon {
		font-size: 2.5rem;
	}

	.empty-state p {
		font-size: 0.95rem;
		margin: 0;
	}

	/* ─── Responsive ───────────────────────────────────────── */
	@media (min-width: 720px) {
		:global(.cards-list-wrapper .link-style) {
			width: 85vw;
			max-width: none;
			font-size: 25px;
		}
	}
</style>
