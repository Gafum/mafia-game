<script>
	import { ChevronDown, User } from 'lucide-svelte';

	export let selectedTag = 'mans';
	export let selectedRoleName = '';
	export let bigDescriptions = {};
	export let errors = {};
	export let onRolePickerOpen;
</script>

<div class="form-group animate-fade">
	<label class="label-text" for="select-trigger">Клас карти (Роль)</label>
	<button
		id="select-trigger"
		type="button"
		class="select-trigger"
		class:input-error={errors.selectedTag}
		on:click={onRolePickerOpen}
	>
		<svelte:component this={bigDescriptions[selectedTag]?.icon || User} size={16} />
		<span class="trigger-text">{selectedRoleName}</span>
		<ChevronDown size={16} class="ms-auto" />
	</button>
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
	.select-trigger {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 10px;
		color: #ffffff;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-size: 0.85rem;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}
	.trigger-text {
		color: #ffffff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 80%;
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
