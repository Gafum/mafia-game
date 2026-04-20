<script>
	import { Check, X } from 'lucide-svelte';

	export let roles = {};
	export let isEditing = false;
	export let onSave;
	export let onCancel;

	// Calculate total players
	$: totalPlayers = Object.values(roles).reduce((sum, count) => sum + count, 0);

	// Create editable copy when entering edit mode
	let editableRoles = { ...roles };

	function handleSave() {
		onSave(editableRoles);
	}

	function handleCancel() {
		editableRoles = { ...roles };
		onCancel();
	}

	// Helper function to get Ukrainian role names
	function getRoleName(roleKey) {
		const roleNames = {
			mans: 'Мирні',
			mafias: 'Мафія',
			doctor: 'Лікар',
			cop: 'Комісар',
			kamikaze: 'Камікадзе',
			maniac: 'Маньяк',
			security: 'Охоронець',
			lawyer: 'Адвокат'
		};
		return roleNames[roleKey] || roleKey;
	}
</script>

<div class="roles-display">
	<div class="roles-header">
		<h3>Згенеровані ролі ({totalPlayers} гравців)</h3>
		{#if isEditing}
			<div class="edit-actions">
				<button class="save-btn" on:click={handleSave}>
					<Check size={16} />
				</button>
				<button class="cancel-btn" on:click={handleCancel}>
					<X size={16} />
				</button>
			</div>
		{/if}
	</div>

	<div class="roles-list">
		{#each Object.entries(isEditing ? editableRoles : roles).filter(([_, count]) => count > 0) as [role, count]}
			<div class="role-item">
				<span class="role-name">{getRoleName(role)}:</span>
				{#if isEditing}
					<input
						type="number"
						min="0"
						max="50"
						bind:value={editableRoles[role]}
						class="role-input"
					/>
				{:else}
					<span class="role-count">{count}</span>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.roles-display {
		background: linear-gradient(135deg, #2a2a2a, #1a1a1a);
		border: 2px solid #8B0000;
		border-radius: 12px;
		padding: 20px;
		margin: 20px 0;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
	}

	.roles-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;
		border-bottom: 1px solid #444;
		padding-bottom: 10px;
	}

	.roles-header h3 {
		color: #FFD700;
		margin: 0;
		font-size: 18px;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
	}

	.edit-actions {
		display: flex;
		gap: 8px;
	}

	.save-btn, .cancel-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.save-btn {
		background: #228B22;
		color: white;
	}

	.save-btn:hover {
		background: #32CD32;
	}

	.cancel-btn {
		background: #8B0000;
		color: white;
	}

	.cancel-btn:hover {
		background: #DC143C;
	}

	.roles-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.role-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 6px;
	}

	.role-name {
		color: #FFF;
		font-weight: 500;
	}

	.role-count {
		color: #FFD700;
		font-weight: bold;
		font-size: 16px;
	}

	.role-input {
		width: 60px;
		padding: 4px 8px;
		background: #333;
		border: 1px solid #555;
		border-radius: 4px;
		color: white;
		text-align: center;
		font-size: 14px;
	}

	.role-input:focus {
		outline: none;
		border-color: #FFD700;
		box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.3);
	}
</style>