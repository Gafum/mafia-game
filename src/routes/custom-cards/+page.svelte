<!-- src/routes/custom-cards/+page.svelte -->
<script>
	import {
		customCardsStore,
		addCustomCard,
		updateCustomCard,
		deleteCustomCard,
		addCustomDescription,
		addCustomRule,
		bigDescriptions
	} from '$lib/stores';
	import { TriangleAlert } from 'lucide-svelte';
	import { iconMap } from '$lib/data';
	import { slugify, validateForm } from '$lib/utils/customCardsUtils';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import RolePickerModal from '$lib/UI/Modals/RolePickerModal.svelte';
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte';
	import CardList from './CardList.svelte';
	import UnifiedCardForm from './UnifiedCardForm.svelte';
	import '$lib/UI/Buttons/SimpleLink.css';

	const iconList = Object.keys(iconMap);

	let formMode = 'existing';
	let cardDescription = '';
	let imageBase64 = '';
	let selectedTag = 'mans';
	let newRoleName = '';
	let newRoleDescription = '';
	let selectedIconName = 'User';
	let editIndex = null;

	let rolePickerOpen = false;
	let deleteModalOpen = false;
	let cardToDeleteIndex = null;
	let errors = {};

	$: if (cardDescription) errors.cardDescription = '';
	$: if (imageBase64) errors.imageBase64 = '';
	$: if (newRoleName) errors.newRoleName = '';
	$: if (newRoleDescription) errors.newRoleDescription = '';

	$: selectedRoleName = $bigDescriptions[selectedTag]?.name || selectedTag;

	function handleRoleSelect(event) {
		selectedTag = event.detail;
		rolePickerOpen = false;
		errors.selectedTag = '';
	}

	function handleImageChange(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		if (!file.type.startsWith('image/')) {
			errors.imageBase64 = 'Будь ласка, завантажте зображення.';
			return;
		}
		errors.imageBase64 = '';
		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.src = reader.result;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const MAX_WIDTH = 400;
				const scale = MAX_WIDTH / img.width;
				canvas.width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
				canvas.height = img.width > MAX_WIDTH ? img.height * scale : img.height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
			};
		};
		reader.readAsDataURL(file);
	}

	function resetForm() {
		cardDescription = '';
		imageBase64 = '';
		selectedTag = 'mans';
		newRoleName = '';
		newRoleDescription = '';
		selectedIconName = 'User';
		formMode = 'existing';
		editIndex = null;
		errors = {};
	}

	function handleSubmit() {
		const state = { cardDescription, imageBase64, newRoleName, newRoleDescription };
		const currentErrors = validateForm(state, formMode);
		if (Object.keys(currentErrors).length > 0) {
			errors = currentErrors;
			return;
		}

		let tagToUse = selectedTag;
		if (formMode === 'new') {
			const cleanedName = newRoleName.substring(0, 20).trim();
			const cleanedDesc = newRoleDescription.substring(0, 300).trim();

			if (editIndex === null || !tagToUse.startsWith('custom_')) {
				const prefix = slugify(cleanedName) || 'role';
				const timestamp = Date.now().toString(36);
				const randomHash = Math.random().toString(36).substring(2, 6);
				tagToUse = `custom_${prefix}_${timestamp}_${randomHash}`;

				addCustomDescription(tagToUse, {
					name: cleanedName,
					description: cleanedDesc,
					iconName: selectedIconName
				});
				addCustomRule(tagToUse, true);
			} else {
				addCustomDescription(tagToUse, {
					name: cleanedName,
					description: cleanedDesc,
					iconName: selectedIconName
				});
			}
		}

		const cardData = {
			description: cardDescription.substring(0, 50).trim(),
			myImg: imageBase64,
			tag: tagToUse
		};
		if (editIndex !== null) {
			updateCustomCard(editIndex, cardData);
		} else {
			addCustomCard(cardData);
		}
		resetForm();
	}

	function handleEdit(index) {
		errors = {};
		editIndex = index;
		const card = $customCardsStore[index];
		cardDescription = card.description;
		selectedTag = card.tag;
		imageBase64 = card.myImg.startsWith('data:') ? card.myImg : '';

		const isCustomRole = card.tag.startsWith('custom_');
		if (isCustomRole && $bigDescriptions[card.tag]) {
			formMode = 'new';
			newRoleName = $bigDescriptions[card.tag].name;
			newRoleDescription = $bigDescriptions[card.tag].description;
			selectedIconName = $bigDescriptions[card.tag].iconName || 'User';
		} else {
			formMode = 'existing';
		}
	}

	function confirmDelete(index) {
		cardToDeleteIndex = index;
		deleteModalOpen = true;
	}

	function executeDelete() {
		if (cardToDeleteIndex !== null) {
			deleteCustomCard(cardToDeleteIndex);
			deleteModalOpen = false;
			if (editIndex === cardToDeleteIndex) resetForm();
			cardToDeleteIndex = null;
		}
	}
</script>

<div class="constructor-wrapper">
	<header class="main-header">
		<h1 class="text-white">Колода карт</h1>
	</header>

	<div class="layout-grid">
		<CardList onEdit={handleEdit} onDelete={confirmDelete} />

		<section class="form-section">
			<h2 class="section-title text-white">
				{editIndex !== null ? 'Редагування карти' : 'Створення карти'}
			</h2>

			<UnifiedCardForm
				isEditing={editIndex !== null}
				bind:formMode
				bind:cardDescription
				bind:imageBase64
				bind:selectedTag
				{selectedRoleName}
				bind:newRoleName
				bind:newRoleDescription
				bind:selectedIconName
				{errors}
				{iconList}
				{bigDescriptions}
				onRolePickerOpen={() => (rolePickerOpen = true)}
				onImageChange={handleImageChange}
				onSubmit={handleSubmit}
				onCancel={resetForm}
			/>
		</section>
	</div>

	<StandardLinks />
</div>

<BaseModal open={deleteModalOpen} on:close={() => (deleteModalOpen = false)}>
	<div class="modal-header-slot" slot="header">
		<TriangleAlert class="details-icon" color="#ef4444" />
		<div>
			<h3 class="text-white">Видалення карти</h3>
			<p class="subtitle">Дія є незворотною</p>
		</div>
	</div>
	<div class="modal-body-content">
		<p class="description text-white">Ви впевнені, що хочете видалити цю карту з колоди?</p>
		<div class="modal-actions-row">
			<button class="modal-btn confirm" on:click={executeDelete}>Видалити</button>
			<button class="modal-btn cancel" on:click={() => (deleteModalOpen = false)}>Скасувати</button>
		</div>
	</div>
</BaseModal>

<RolePickerModal
	open={rolePickerOpen}
	on:close={() => (rolePickerOpen = false)}
	on:select={handleRoleSelect}
/>

<style>
	.text-white {
		color: #ffffff !important;
	}
	.constructor-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 16px;
		width: 100%;
		box-sizing: border-box;
	}
	.main-header {
		margin-bottom: 24px;
		border-bottom: 1px solid #232326;
		padding-bottom: 12px;
	}
	.main-header h1 {
		font-size: 1.6rem;
		font-weight: 800;
		margin: 0;
	}
	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 24px;
		align-items: start;
		min-height: 70svh;
		margin-bottom: 40px;
	}
	.form-section {
		background: #111113;
		border-radius: 12px;
		padding: 16px;
		border: 1px solid #232326;
		width: 100%;
	}
	.section-title {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 16px;
	}
	.modal-header-slot {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.modal-header-slot h3 {
		margin: 0;
		font-size: 1.2rem;
	}
	.subtitle {
		margin: 0;
		font-size: 0.8rem;
		color: #71717a;
	}
	.modal-body-content {
		padding: 25px 0 0;
	}
	.modal-actions-row {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.modal-btn {
		flex: 1;
		padding: 8px;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
		font-size: 0.9rem;
	}
	.modal-btn.confirm {
		background: #ef4444;
		border: none;
		color: white;
	}
	.modal-btn.cancel {
		background: #232326;
		border: none;
		color: #a1a1aa;
	}
	@media (max-width: 950px) {
		.main-header {
			margin-bottom: 12px;
			border-bottom: none;
		}
		.main-header h1 {
			width: 100%;
			text-align: center;
		}
		.layout-grid {
			grid-template-columns: 1fr;
			gap: 16px;
		}
		.form-section {
			order: -1;
		}
	}

	@media (max-width: 600px) {
		.section-title {
			text-align: center;
			width: 100%;
		}
	}
</style>
