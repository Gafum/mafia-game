<!-- src/routes/custom-cards/UnifiedCardForm.svelte -->
<script>
	import { Upload, Plus, Check } from 'lucide-svelte';
	import FormField from './FormField.svelte';
	import ExistingRoleFields from './ExistingRoleFields.svelte';
	import NewRoleFields from './NewRoleFields.svelte';

	export let isEditing = false;
	export let formMode = 'existing';
	export let cardDescription = '';
	export let imageBase64 = '';
	export let selectedTag = 'mans';
	export let selectedRoleName = '';
	export let newRoleName = '';
	export let newRoleDescription = '';
	export let selectedIconName = 'User';
	export let errors = {};
	export let iconList = [];
	export let bigDescriptions = {};

	export let onRoleSelect;
	export let onImageChange;
	export let onSubmit;
	export let onCancel = null;

	// Derive unique file input id to avoid DOM conflicts
	$: fileInputId = isEditing ? 'file-edit' : 'file-create';
</script>

{#if !isEditing}
	<div class="mode-selector">
		<button
			type="button"
			class:active={formMode === 'existing'}
			on:click={() => (formMode = 'existing')}
		>
			Існуюча роль
		</button>
		<button type="button" class:active={formMode === 'new'} on:click={() => (formMode = 'new')}>
			Нова роль
		</button>
	</div>
{/if}

{#if formMode === 'existing'}
	<ExistingRoleFields {selectedTag} {selectedRoleName} {bigDescriptions} {errors} {onRoleSelect} />
{:else}
	<NewRoleFields
		bind:newRoleName
		bind:newRoleDescription
		bind:selectedIconName
		{errors}
		{iconList}
	/>
{/if}

<div class="divider" />
<FormField
	id="card-quote"
	label="Цитата / Фраза на карті"
	placeholder="«Я знаю...»"
	error={errors.cardDescription}
	bind:value={cardDescription}
	maxlength="50"
/>

<div class="form-group">
	<label class="label-text" for={fileInputId}>Зображення карти</label>
	<div class="upload-wrapper" class:input-error={errors.imageBase64}>
		{#if imageBase64}
			<div class="image-preview">
				<img src={imageBase64} alt="Preview" />
				<button type="button" class="remove-btn" on:click={() => (imageBase64 = '')}
					>Прибрати фото</button
				>
			</div>
		{:else}
			<label class="upload-area">
				<input type="file" id={fileInputId} accept="image/*" on:change={onImageChange} />
				<Upload size={20} />
				<span class="text-white">Завантажити картинку</span>
			</label>
		{/if}
	</div>
	{#if errors.imageBase64}
		<span class="error-text">{errors.imageBase64}</span>
	{/if}
</div>

<button type="button" class="link-style red submit-btn" on:click={onSubmit}>
	{#if isEditing}
		<Check size={18} color="#fff" />
		Зберегти зміни
	{:else}
		<Plus size={18} color="#fff" />
		Додати в колоду
	{/if}
</button>

{#if isEditing && onCancel}
	<button type="button" class="link-style transparent text-white cancel-btn" on:click={onCancel}>
		Скасувати
	</button>
{/if}

<style>
	.text-white {
		color: #ffffff !important;
	}
	.label-text {
		color: #a1a1aa;
		font-size: 0.8rem;
		font-weight: 600;
	}
	.mode-selector {
		display: flex;
		background: #161619;
		padding: 4px;
		border-radius: 8px;
		margin-bottom: 18px;
		border: 1px solid #232326;
		gap: 4px;
	}
	.mode-selector button {
		flex: 1;
		background: transparent;
		border: none;
		color: #a1a1aa;
		padding: 8px 4px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
	}
	.mode-selector button.active {
		background: #ff4444;
		color: white;
	}
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 18px;
		width: 100%;
		box-sizing: border-box;
	}
	.divider {
		height: 1px;
		background: #232326;
		margin: 16px 0;
	}
	.upload-wrapper {
		border: 2px dashed #232326;
		border-radius: 8px;
		background: #161619;
		overflow: hidden;
	}
	.upload-wrapper:hover {
		border-color: #ff4444;
	}
	.upload-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 16px;
		cursor: pointer;
		color: #71717a;
		font-size: 0.8rem;
	}
	.upload-area input {
		display: none;
	}
	.upload-area span {
		text-align: center;
	}
	.image-preview {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.image-preview img {
		max-height: 90px;
		object-fit: contain;
		border-radius: 6px;
		margin-bottom: 10px;
		max-width: 100%;
	}
	.remove-btn {
		background: #232326;
		border: none;
		color: #f43f5e;
		padding: 4px 10px;
		font-size: 0.9rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
	}
	.submit-btn {
		width: 100%;
		font-size: 1.2rem !important;
	}
	.cancel-btn {
		margin-top: 8px;
		width: 100%;
		font-size: 1.2rem;
	}
	.error-text {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 2px;
		font-weight: 600;
	}

	@media (max-width: 480px) {
		.mode-selector {
			flex-direction: column;
		}
	}
</style>
