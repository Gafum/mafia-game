<script>
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte';
	import { ArrowDownAZ, ArrowUpAZ } from 'lucide-svelte';
	import { TEAMS } from '$lib/data/teams';

	export let isModalOpen = false;
	export let activeTab = 'all';
	export let sortField = 'default';
	export let sortDir = 'asc';
	export let hasCustomRoles = false;

	function setSort(field) {
		if (sortField === field) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortField = field;
			sortDir = 'asc';
		}
	}
</script>

<BaseModal bind:open={isModalOpen} on:close={() => (isModalOpen = false)}>
	<h3 slot="header" class="modal-title">Фільтри</h3>

	<div class="modal-content-blocks">
		<div class="modal-section">
			<span class="section-label">Показати ролі:</span>
			<div class="filter-chips">
				{#each [{ value: 'all', label: 'Всі', color: '#fff' }, ...TEAMS].filter( (t) => (t.value === 'custom' ? hasCustomRoles : true) ) as team}
					<button
						class="chip"
						class:active={activeTab === team.value}
						on:click={() => (activeTab = team.value)}
						style="--text-color: {team.color};"
					>
						{team.label}
					</button>
				{/each}
			</div>
		</div>

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
						{#if sortDir === 'asc'}<ArrowDownAZ />{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
				<button
					class="sort-row-btn"
					class:active={sortField === 'name'}
					on:click={() => setSort('name')}
				>
					За назвою
					<span class="sort-arrow" class:visible={sortField === 'name'}>
						{#if sortDir === 'asc'}<ArrowDownAZ />{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
				<button
					class="sort-row-btn"
					class:active={sortField === 'description'}
					on:click={() => setSort('description')}
				>
					За описом
					<span class="sort-arrow" class:visible={sortField === 'description'}>
						{#if sortDir === 'asc'}<ArrowDownAZ />{:else}<ArrowUpAZ />{/if}
					</span>
				</button>
			</div>
		</div>
	</div>
</BaseModal>

<style>
	.modal-title {
		font-size: 23px;
		color: #fff;
	}

	.modal-content-blocks {
		display: flex;
		flex-direction: column;
		gap: 24px;
		margin-top: 20px;
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
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 8px 16px;
		color: var(--text-color);
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	.chip.active {
		background: var(--text-color);
		color: #111;
		border-color: #111;
		font-weight: 600;
	}

	.sort-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		background: #111113;
		border: 1px solid #232326;
		border-radius: 12px;
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
		background: rgba(255, 68, 68, 0.1);
		color: white;
		font-weight: 700;
	}

	.sort-arrow {
		opacity: 0;
		font-weight: bold;
	}

	.sort-arrow.visible {
		opacity: 1;
	}

	@media (hover: hover) {
		.chip:not(.active):hover {
			border-color: var(--text-color);
		}
	}
</style>
