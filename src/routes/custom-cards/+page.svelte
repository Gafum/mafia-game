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
	import * as Icons from 'lucide-svelte';
	import { iconMap } from '$lib/data';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import RolePickerModal from '$lib/UI/Modals/RolePickerModal.svelte';
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte';
	import '$lib/UI/Buttons/SimpleLink.css';

	const iconList = Object.keys(iconMap);

	let formMode = 'existing'; // 'existing' або 'new'
	let cardDescription = '';
	let imageBase64 = '';
	let selectedTag = 'mans';

	// Поля для нової ролі
	let newRoleName = '';
	let newRoleTag = '';
	let newRoleDescription = '';
	let selectedIconName = 'User';

	let editIndex = null;

	// Стейт для модалок
	let rolePickerOpen = false;
	let deleteModalOpen = false;
	let cardToDeleteIndex = null;

	// Стейт помилок валідації
	let errors = {};

	// Скидання помилки конкретного поля при введенні даних
	$: if (cardDescription) errors.cardDescription = '';
	$: if (imageBase64) errors.imageBase64 = '';
	$: if (newRoleName) errors.newRoleName = '';
	$: if (newRoleTag) errors.newRoleTag = '';

	// Валідація тегу на льоту (лише латиниця, цифри та підкреслення)
	$: if (newRoleTag) {
		newRoleTag = newRoleTag
			.toLowerCase()
			.replace(/[^a-z0-9_]/g, '')
			.substring(0, 20);
	}

	// Отримання поточної назви ролі для відображення на кнопці селектора
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
			errors.imageBase64 = 'Будь ласка, завантажте коректне зображення.';
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

				if (img.width > MAX_WIDTH) {
					canvas.width = MAX_WIDTH;
					canvas.height = img.height * scale;
				} else {
					canvas.width = img.width;
					canvas.height = img.height;
				}

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
		newRoleTag = '';
		newRoleDescription = '';
		selectedIconName = 'User';
		formMode = 'existing';
		editIndex = null;
		errors = {};
	}

	function validateForm() {
		const currentErrors = {};

		if (!cardDescription.trim()) {
			currentErrors.cardDescription = 'Фраза на карті не може бути порожньою.';
		} else if (cardDescription.length > 50) {
			currentErrors.cardDescription = 'Максимум 50 символів.';
		}

		if (!imageBase64) {
			currentErrors.imageBase64 = 'Необхідно завантажити зображення для карти.';
		}

		if (formMode === 'new' && editIndex === null) {
			if (!newRoleName.trim()) {
				currentErrors.newRoleName = 'Вкажіть назву ролі.';
			}
			if (!newRoleTag.trim()) {
				currentErrors.newRoleTag = 'Вкажіть англійський ID ролі.';
			} else if (Object.keys($bigDescriptions).includes(newRoleTag)) {
				currentErrors.newRoleTag = 'Цей ID ролі вже зайнятий.';
			}
		}

		errors = currentErrors;
		return Object.keys(currentErrors).length === 0;
	}

	function handleSubmit() {
		if (!validateForm()) {
			// Прокрутка до першої помилки для зручності на маленьких девайсах
			setTimeout(() => {
				const firstError = document.querySelector('.error-text');
				if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 50);
			return;
		}

		let tagToUse = selectedTag;

		if (formMode === 'new' && editIndex === null) {
			if (!newRoleName.substring(0, 20).trim() || !newRoleTag.substring(0, 20).trim()) return;

			tagToUse = newRoleTag;

			addCustomDescription(tagToUse, {
				name: newRoleName.substring(0, 20).trim(),
				description:
					newRoleDescription.substring(0, 300).trim() || 'Персонаж із власними правилами.',
				iconName: selectedIconName
			});
			addCustomRule(tagToUse, true);
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

		const isBuiltIn = Object.keys($bigDescriptions).includes(card.tag);

		if (!isBuiltIn && $bigDescriptions[card.tag]) {
			formMode = 'new';
			newRoleName = $bigDescriptions[card.tag].name;
			newRoleTag = card.tag;
			newRoleDescription = $bigDescriptions[card.tag].description;
			selectedIconName = $bigDescriptions[card.tag].iconName || 'User';
		} else {
			formMode = 'existing';
		}

		const formEl = document.querySelector('.form-section');
		if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
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
		<section class="cards-section">
			<h2 class="section-title text-white">Мої карти ({$customCardsStore.length})</h2>

			{#if $customCardsStore.length === 0}
				<div class="empty-state">
					<p class="text-white">Колода порожня.</p>
					<p class="hint">Створіть першу карту за допомогою форми.</p>
				</div>
			{:else}
				<div class="cards-layout">
					{#each $customCardsStore as card, idx}
						<div class="game-card-item animate-fade">
							<div class="real-game-card">
								{#if card.myImg && card.myImg.startsWith('data:')}
									<div class="card-img-wrapper">
										<img src={card.myImg} alt="Card graphic" class="card-main-img" />
									</div>
								{:else}
									<div class="card-graphic-fallback">
										<svelte:component
											this={Icons[$bigDescriptions[card.tag]?.iconName || 'User']}
											size={42}
											color="#111"
										/>
									</div>
								{/if}
								<div class="card-text-content">
									<p class="game-phrase">{card.description}</p>
								</div>
							</div>

							<div class="card-meta-panel">
								<div class="meta-info">
									<span class="role-indicator-tag">
										{$bigDescriptions[card.tag]?.name || card.tag}
									</span>
								</div>
								<div class="meta-actions">
									<button
										class="action-icon-btn edit"
										on:click={() => handleEdit(idx)}
										aria-label="Редагувати"
									>
										<svelte:component this={Icons.Pen} size={15} />
									</button>
									<button
										class="action-icon-btn delete"
										on:click={() => confirmDelete(idx)}
										aria-label="Видалити"
									>
										<svelte:component this={Icons.Trash2} size={15} />
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>

		<section class="form-section">
			<h2 class="section-title text-white">
				{editIndex !== null ? 'Редагування карти' : 'Створення карти'}
			</h2>

			{#if editIndex == null}
				<div class="mode-selector">
					<button
						type="button"
						class:active={formMode === 'existing'}
						disabled={editIndex !== null}
						on:click={() => (formMode = 'existing')}
					>
						Існуюча роль
					</button>
					<button
						type="button"
						class:active={formMode === 'new'}
						disabled={editIndex !== null}
						on:click={() => (formMode = 'new')}
					>
						Нова роль
					</button>
				</div>
			{/if}

			{#if editIndex == null}
				{#if formMode === 'existing'}
					<div class="form-group animate-fade">
						<label class="text-gray" for="custom-select-trigger">Клас гри (Роль)</label>
						<button
							id="custom-select-trigger"
							type="button"
							class="custom-select-trigger"
							class:input-error={errors.selectedTag}
							on:click={() => (rolePickerOpen = true)}
						>
							<svelte:component
								this={Icons[$bigDescriptions[selectedTag]?.iconName || 'User']}
								size={16}
							/>
							<span class="text-white truncate-text">{selectedRoleName}</span>
							<svelte:component this={Icons.ChevronDown} size={16} class="ms-auto" />
						</button>
					</div>
				{:else}
					<div class="animate-fade">
						<div class="form-group">
							<label class="text-gray" for="role-name">Назва ролі</label>
							<input
								type="text"
								id="role-name"
								placeholder="Бос, Лікар..."
								class:input-error={errors.newRoleName}
								bind:value={newRoleName}
								maxlength="20"
							/>
							{#if errors.newRoleName}
								<span class="error-text">{errors.newRoleName}</span>
							{/if}
							<span class="char-counter">{newRoleName.length}/20</span>
						</div>
						<div class="form-group">
							<label class="text-gray" for="role-id">ID ролі (англ)</label>
							<input
								type="text"
								id="role-id"
								placeholder="boss, doctor"
								class:input-error={errors.newRoleTag}
								bind:value={newRoleTag}
								disabled={editIndex !== null}
								maxlength="20"
							/>
							{#if errors.newRoleTag}
								<span class="error-text">{errors.newRoleTag}</span>
							{/if}
							<span class="char-counter">{newRoleTag.length}/20</span>
						</div>

						<div class="form-group">
							<label class="text-gray" for="role-desc">Опис здібностей ролі</label>
							<textarea
								id="role-desc"
								rows="3"
								maxlength="300"
								placeholder="Що робить цей гравець вночі..."
								bind:value={newRoleDescription}
							/>
							<span class="char-counter">{newRoleDescription.length}/300</span>
						</div>

						<div class="form-group">
							<label class="text-gray" for="icon-selector-grid">Іконка для нової ролі</label>
							<div class="icon-selector-grid">
								{#each iconList as iconName}
									<button
										type="button"
										class="icon-btn"
										class:selected={selectedIconName === iconName}
										on:click={() => (selectedIconName = iconName)}
									>
										<svelte:component this={Icons[iconName]} size={18} />
									</button>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			{/if}

			<div class="divider" />

			<div class="form-group">
				<label class="text-gray" for="desc">Цитата / Фраза на карті</label>
				<input
					type="text"
					id="desc"
					placeholder="«Я знаю, хто мафія...»"
					class:input-error={errors.cardDescription}
					bind:value={cardDescription}
					maxlength="50"
				/>
				{#if errors.cardDescription}
					<span class="error-text">{errors.cardDescription}</span>
				{/if}
				<span class="char-counter">{cardDescription.length}/50</span>
			</div>

			<div class="form-group">
				<label class="text-gray" for="file">Зображення карти</label>
				<div class="upload-wrapper" class:input-error={errors.imageBase64}>
					{#if imageBase64}
						<div class="image-preview">
							<img src={imageBase64} alt="Preview" />
							<button type="button" class="remove-img-btn" on:click={() => (imageBase64 = '')}>
								Прибрати фото
							</button>
						</div>
					{:else}
						<label class="upload-area">
							<input type="file" id="file" accept="image/*" on:change={handleImageChange} />
							<svelte:component this={Icons.Upload} size={20} />
							<span class="text-white text-center">Завантажити картинку</span>
						</label>
					{/if}
				</div>
				{#if errors.imageBase64}
					<span class="error-text">{errors.imageBase64}</span>
				{/if}
			</div>

			<button type="button" class="link-style red submit-btn-override" on:click={handleSubmit}>
				<svelte:component
					this={editIndex !== null ? Icons.Check : Icons.Plus}
					size={18}
					color="#fff"
				/>
				{editIndex !== null ? 'Зберегти зміни' : 'Додати в колоду'}
			</button>

			{#if editIndex !== null}
				<button class="link-style transparent text-white cancel-btn" on:click={resetForm}>
					Скасувати
				</button>
			{/if}
		</section>
	</div>

	<StandardLinks />
</div>

<BaseModal open={deleteModalOpen} on:close={() => (deleteModalOpen = false)}>
	<div class="modal-header-slot" slot="header">
		<svelte:component this={Icons.TriangleAlert} class="details-icon" color="#ef4444" />
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
	.text-gray {
		color: #a1a1aa !important;
	}
	.text-center {
		text-align: center;
	}

	.constructor-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 16px 16px 50px;
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

	.cards-section {
		border: none;
		background: transparent;
		padding: 0;
		width: 100%;
	}

	.section-title {
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 16px;
	}

	.cards-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 12px;
	}

	.game-card-item {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		border: 1px solid #232326;
	}

	.real-game-card {
		background: #ffffff;
		height: 205px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 12px;
		position: relative;
	}

	.card-img-wrapper {
		width: 100%;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.card-main-img {
		border-radius: 8px;
		height: 100%;
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}

	.card-graphic-fallback {
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.card-text-content {
		width: 100%;
		text-align: center;
		margin-top: auto;
	}

	.game-phrase {
		color: #111111 !important;
		font-size: 0.85rem;
		font-style: italic;
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
		word-break: break-word;
	}

	.card-meta-panel {
		background: #161619;
		padding: 8px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #232326;
		gap: 4px;
	}

	.role-indicator-tag {
		background: #2f2f33;
		color: #e4e4e7;
		padding: 3px 6px;
		border-radius: 4px;
		font-size: 0.9rem;
		font-weight: 600;
		display: inline-block;
		max-width: 90px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.meta-actions {
		display: flex;
		gap: 4px;
	}

	.action-icon-btn {
		background: #232326;
		border: none;
		color: #a1a1aa;
		width: 26px;
		height: 26px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.error-text {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 2px;
		font-weight: 600;
		animation: fadeIn 0.15s ease-out;
	}

	:global(.input-error) {
		border-color: #ef4444 !important;
		background: rgba(239, 68, 68, 0.03) !important;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-bottom: 18px;
		position: relative;
		width: 100%;
		box-sizing: border-box;
	}

	.form-group label {
		font-size: 0.8rem;
		font-weight: 600;
	}

	input[type='text'],
	textarea {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 10px;
		color: white !important;
		font-size: 0.85rem;
		outline: none;
		width: 100%;
		box-sizing: border-box;
	}

	input:focus,
	textarea:focus {
		border-color: #ff4444;
	}

	.char-counter {
		position: absolute;
		bottom: -15px;
		right: 2px;
		font-size: 0.65rem;
		color: #52525b;
	}

	.custom-select-trigger {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 10px;
		color: white;
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-size: 0.85rem;
		text-align: left;
		width: 100%;
		box-sizing: border-box;
	}

	.truncate-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 80%;
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
		transition-property: color, background;
		transition-duration: 0.2s;
	}

	.mode-selector button.active {
		background: #ff4444;
		color: white;
	}

	.icon-selector-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 6px;
		margin-top: 2px;
		width: 100%;
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

	.divider {
		height: 1px;
		background: #232326;
		margin: 16px 0;
	}

	.upload-wrapper {
		border: 2px dashed #232326;
		border-radius: 8px;
		background: #161619;
		width: 100%;
		box-sizing: border-box;
		overflow: hidden;
		transition: border 0.2s;
	}

	.upload-wrapper:hover {
		border: 2px dashed #ff4444;
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

	.image-preview {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
	}

	.image-preview img {
		max-height: 90px;
		object-fit: contain;
		border-radius: 6px;
		margin-bottom: 10px;
		max-width: 100%;
	}

	.remove-img-btn {
		background: #232326;
		border: none;
		color: #f43f5e;
		padding: 4px 10px;
		font-size: 0.9rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
	}

	.submit-btn-override {
		font-size: 1.2rem !important;
	}

	.cancel-btn {
		margin-top: 8px;
		font-size: 1.2rem;
	}

	.empty-state {
		text-align: center;
		padding: 30px 16px;
		color: #52525b;
		font-size: 0.85rem;
		border: 1px dashed #232326;
		border-radius: 12px;
	}

	.hint {
		font-size: 0.75rem;
		color: #3f3f46;
		margin-top: 2px;
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

	.animate-fade {
		animation: fadeIn 0.2s ease-out;
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

		.icon-selector-grid {
			grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
		}
	}

	@media (max-width: 600px) {
		.section-title {
			width: 100%;
			text-align: center;
		}
	}
	@media (max-width: 400px) {
		.mode-selector {
			flex-direction: column;
			gap: 2px;
			background: transparent;
			border: none;
			padding: 0;
		}

		.mode-selector button {
			border: 1px solid #232326;
			background: #161619;
			border-radius: 6px;
			padding: 10px;
			width: 100%;
		}

		.icon-selector-grid {
			grid-template-columns: repeat(5, 1fr);
		}
	}

	@media (max-width: 300px) {
		.icon-selector-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.cards-layout {
			grid-template-columns: 1fr;
		}

		.main-header h1 {
			font-size: 1.3rem;
		}
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
