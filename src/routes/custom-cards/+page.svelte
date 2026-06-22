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

	import { onMount } from 'svelte';
	import * as Icons from 'lucide-svelte';
	import { validateForm } from '$lib/utils/customCardsUtils';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';

	import CardList from './CardList.svelte';
	import UnifiedCardForm from './UnifiedCardForm.svelte';
	import AdminPanel from './AdminPanel.svelte';
	import '$lib/UI/Buttons/SimpleLink.css';
	import {
		buildCardSubmission,
		getFormStateFromCard,
		resizeImageFile
	} from './customCardFormHelpers.js';

	const iconList = [
		'Shield',
		'Crosshair',
		'HeartPulse',
		'UserCheck',
		'Briefcase',
		'Bomb',
		'HatGlasses',
		'User',
		'Drama',
		'Brain'
	];
	const initialForm = {
		formMode: 'existing',
		cardDescription: '',
		imageBase64: '',
		selectedTag: 'mans',
		newRoleName: '',
		newRoleDescription: '',
		selectedIconName: 'User'
	};

	let form = { ...initialForm };
	let editIndex = null;
	let errors = {};
	let isAdmin = false;
	let isLocal = false;

	onMount(() => {
		if (
			Boolean(window) &&
			(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
		) {
			isLocal = true;
		}
	});

	$: selectedRoleName = $bigDescriptions[form.selectedTag]?.name || form.selectedTag;

	async function handleImageChange(event) {
		const file = event.target.files?.[0];
		if (!file) return;

		try {
			form.imageBase64 = await resizeImageFile(file);
			errors = { ...errors, imageBase64: '' };
		} catch {
			errors = { ...errors, imageBase64: 'Будь ласка, завантажте зображення.' };
		}
	}

	function resetForm() {
		form = { ...initialForm };
		editIndex = null;
		errors = {};
	}

	function handleSubmit() {
		const currentErrors = validateForm(form, form.formMode);
		if (Object.keys(currentErrors).length) {
			errors = currentErrors;
			return;
		}

		const { cardData, customDescription, shouldAddRule } = buildCardSubmission({
			...form,
			editIndex
		});

		if (form.formMode === 'new') {
			addCustomDescription(cardData.tag, customDescription);
			if (shouldAddRule) {
				addCustomRule(cardData.tag, true);
			}
		}

		if (editIndex !== null) {
			updateCustomCard(editIndex, cardData);
		} else {
			addCustomCard(cardData);
		}

		resetForm();
	}

	function handleRoleSelect(event) {
		form.selectedTag = event.detail;
		errors = { ...errors, selectedTag: '' };
	}

	function handleEdit(index) {
		errors = {};
		editIndex = index;
		form = getFormStateFromCard($customCardsStore[index], $bigDescriptions);
	}

	function executeDelete(cardToDeleteIndex) {
		if (cardToDeleteIndex === null) return;
		deleteCustomCard(cardToDeleteIndex);
		if (editIndex === cardToDeleteIndex) resetForm();
	}
</script>

<div class="constructor-wrapper">
	<header class="main-header">
		<h1 class="text-white">Колода карт</h1>
	</header>
	{#if isLocal}
		<div class="mode-selector">
			<button type="button" class:active={!isAdmin} on:click={() => (isAdmin = false)}>
				Юзер
			</button>
			<button type="button" class:active={isAdmin} on:click={() => (isAdmin = true)}>
				Адмін
			</button>
		</div>
	{/if}
	{#if isLocal && isAdmin}
		<AdminPanel />
	{:else}
		<div class="layout-grid">
			<CardList onEdit={handleEdit} deleteCard={executeDelete} />
			<section class="form-section">
				<h2 class="section-title text-white">
					{editIndex !== null ? 'Редагування карти' : 'Створення карти'}
				</h2>

				<UnifiedCardForm
					isEditing={editIndex !== null}
					bind:form
					{selectedRoleName}
					{errors}
					{iconList}
					{bigDescriptions}
					onRoleSelect={handleRoleSelect}
					onImageChange={handleImageChange}
					onSubmit={handleSubmit}
					onCancel={resetForm}
				/>
			</section>
		</div>
	{/if}

	<StandardLinks />
</div>

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
