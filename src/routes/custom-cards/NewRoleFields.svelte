<script>
	import { Icons } from '$lib/components/icons.js';
	import FormField from './FormField.svelte';

	export let newRoleName = '';
	export let newRoleDescription = '';
	export let selectedIconName = 'User';
	export let errors = {};
	let iconList = Object.keys(Icons).filter((iconName) => iconName !== 'CircleQuestionMark'); // without Default import in icons.js
</script>

<div class="animate-fade">
	<FormField
		id="role-name"
		label="Назва ролі"
		placeholder="Бос, Лікар..."
		error={errors.newRoleName}
		bind:value={newRoleName}
		maxlength="20"
	/>
	<FormField
		id="role-desc"
		label="Опис здібностей"
		placeholder="Що робить..."
		error={errors.newRoleDescription}
		bind:value={newRoleDescription}
		maxlength="300"
		isTextarea={true}
	/>
	<div class="form-group">
		<label class="label-text" for="icon-grid">Іконка для ролі</label>
		<div class="icon-grid">
			{#each iconList as name}
				<button
					type="button"
					class="icon-btn"
					class:selected={selectedIconName === name}
					on:click={() => (selectedIconName = name)}
				>
					<svelte:component this={Icons[name] || Icons.User} size={18} />
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.label-text {
		color: #a1a1aa;
		font-size: 0.8rem;
		font-weight: 600;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 18px;
		width: 100%;
		box-sizing: border-box;
	}
	.icon-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 6px;
	}
	.icon-btn {
		background: #161619;
		border: 1px solid #232326;
		color: #a1a1aa;
		padding: 8px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 38px;
	}
	.icon-btn.selected {
		background: rgba(255, 68, 68, 0.12);
		border-color: #ff4444;
		color: #ff4444;
	}
	.animate-fade {
		animation: fadeIn 0.2s ease-out;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
