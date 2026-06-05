<script>
	import { createEventDispatcher } from 'svelte';
	import { bigDescriptionList } from '$lib/data';
	import BaseModal from './BaseModal.svelte';

	export let open = false;

	const dispatch = createEventDispatcher();

	const roles = Object.entries(bigDescriptionList);

	function selectRole(tag) {
		dispatch('select', tag);
		dispatch('close');
	}
</script>

<BaseModal {open} on:close>
	<div class="header" slot="header">
		<h2>Вибір ролі</h2>
	</div>

	<!-- CONTENT -->
	<div class="grid">
		{#each roles as [tag, role]}
			<button class="role-card" on:click={() => selectRole(tag)}>
				<div class="role-icon">
					<svelte:component this={role.icon} size={22} />
				</div>
				<div class="role-name">{role.name}</div>
			</button>
		{/each}
	</div>
</BaseModal>

<style>
	.header {
		min-height: 42px;
		margin-bottom: 8px;
	}

	.header h2 {
		font-size: 25px;
		color: #fff;
	}

	/* GRID */
	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
		max-height: 45vh;
		height: 45vh;
		max-height: calc(45svh - 80px);
		height: calc(45svh - 42px);
		height: calc(45dvh - 42px);
		overflow-y: auto;
		padding: 0 6px 30px 0;
	}

	/* ROLE CARD */
	.role-card {
		display: flex;
		align-items: center;
		gap: 12px;

		padding: 5px 8px;
		border-radius: 10px;
		background: #1b1b1b;
		cursor: pointer;
		text-align: left;

		transition: background 0.2s ease, border 0.2s ease;
		will-change: transform;
	}

	@media (hover: hover) {
		.role-card:hover {
			background: #222222;
		}
	}

	/* ICON */
	.role-icon {
		width: 38px;
		height: 38px;
		border-radius: 10px;

		display: flex;
		align-items: center;
		justify-content: center;

		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.08);

		flex-shrink: 0;
	}

	.role-name {
		font-size: 18px;
		color: #ffffff;
	}

	@media (max-height: 600px) {
		.grid {
			gap: 8px;
			max-height: 100vh;
			height: 80vh;
			height: 80svh;
			height: calc(80svh - 90px);
			height: calc(80dvh - 90px);
		}
	}

	@media (max-width: 500px), (max-height: 700px) and (max-width: 650px) {
		.grid {
			gap: 8px;
			max-height: 100vh;
			height: 95vh;
			height: 95svh;
			height: calc(95svh - 90px);
			height: calc(95dvh - 90px);
		}

		.role-name {
			font-size: 16px;
		}

		.header {
			margin: 6px 0 12px;
		}
	}

	@media (max-width: 320px) {
		.role-icon {
			width: 32px;
			height: 32px;
			border-radius: 7px;
		}
		.header {
			margin: 0px 0 2px;
		}
		.header h2 {
			font-size: 20px;
		}
	}
</style>
