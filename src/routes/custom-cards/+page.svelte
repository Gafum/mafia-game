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
	import RolePickerModal from '$lib/UI/Modals/RolePickerModal.svelte'; // Твоя модалка селектора
	import BaseModal from '$lib/UI/Modals/BaseModal.svelte'; // Твоя базова модалка

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

	// Валідація тегу (лише англ)
	$: if (newRoleTag) {
		newRoleTag = newRoleTag.toLowerCase().replace(/[^a-z0-9_]/g, '');
	}

	// Отримання поточної назви ролі для відображення на кнопці селектора
	$: selectedRoleName = $bigDescriptions[selectedTag]?.name || selectedTag;

	function handleRoleSelect(event) {
		selectedTag = event.detail.tag;
		rolePickerOpen = false;
	}

	function handleImageChange(event) {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => (imageBase64 = reader.result);
			reader.readAsDataURL(file);
		}
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
	}

	function handleSubmit() {
		if (!cardDescription.trim()) return; // Можна замінити на тост, якщо є

		let tagToUse = selectedTag;

		if (formMode === 'new' && editIndex === null) {
			if (!newRoleName.trim() || !newRoleTag.trim()) return;

			tagToUse = newRoleTag;

			addCustomDescription(tagToUse, {
				name: newRoleName.trim(),
				description: newRoleDescription.trim() || 'Персонаж із власними правилами.',
				iconName: selectedIconName
			});
			addCustomRule(tagToUse, true);
		}

		const cardData = {
			description: cardDescription.trim(),
			myImg: imageBase64 || 'Custom',
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
		editIndex = index;
		const card = $customCardsStore[index];
		cardDescription = card.description;
		selectedTag = card.tag;
		imageBase64 = card.myImg.startsWith('data:') ? card.myImg : '';

		const isBuiltIn = Object.keys($bigDescriptions).includes(card.tag);

		// Якщо роль кастомна і ми її редагуємо
		if (!isBuiltIn && $bigDescriptions[card.tag]) {
			formMode = 'new';
			newRoleName = $bigDescriptions[card.tag].name;
			newRoleTag = card.tag;
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
			cardToDeleteIndex = null;
			if (editIndex === cardToDeleteIndex) resetForm();
		}
	}
</script>

<div class="constructor-wrapper">
	<header class="main-header">
		<h1 class="text-white">Колода карт</h1>
	</header>

	<div class="layout-grid">
		<section class="cards-section">
			<h2 class="section-title text-white">Створені карти ({$customCardsStore.length})</h2>

			{#if $customCardsStore.length === 0}
				<div class="empty-state">
					<p>Колода порожня.</p>
					<p class="hint">Створіть першу карту за допомогою форми праворуч.</p>
				</div>
			{:else}
				<div class="cards-layout">
					{#each $customCardsStore as card, idx}
						<div class="game-card-item animate-fade">
							<div class="real-game-card">
								{#if card.myImg && card.myImg.startsWith('data:')}
									<img src={card.myImg} alt="Card graphic" class="card-main-img" />
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
									<p class="game-phrase">"{card.description}"</p>
								</div>
							</div>

							<div class="card-meta-panel">
								<div class="meta-info">
									<span class="role-indicator-tag">
										{$bigDescriptions[card.tag]?.name || card.tag}
									</span>
								</div>
								<div class="meta-actions">
									<button class="action-icon-btn edit" on:click={() => handleEdit(idx)}>
										<svelte:component this={Icons.Edit2} size={15} />
									</button>
									<button class="action-icon-btn delete" on:click={() => confirmDelete(idx)}>
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

			{#if formMode === 'existing'}
				<div class="form-group animate-fade">
					<label class="text-gray">Клас гри (Роль)</label>
					<button
						type="button"
						class="custom-select-trigger"
						on:click={() => (rolePickerOpen = true)}
					>
						<svelte:component
							this={Icons[$bigDescriptions[selectedTag]?.iconName || 'User']}
							size={16}
						/>
						<span>{selectedRoleName}</span>
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
							bind:value={newRoleName}
						/>

						<div class="form-group">
							<label class="text-gray" for="role-id">ID ролі (англ)</label>
							<input
								type="text"
								id="role-id"
								placeholder="boss, doctor"
								bind:value={newRoleTag}
								disabled={editIndex !== null}
							/>
						</div>
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
						<label class="text-gray">Іконка для нової ролі</label>
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

			<div class="divider" />

			<div class="form-group">
				<label class="text-gray" for="desc">Цитата / Фраза на карті</label>
				<input
					type="text"
					id="desc"
					placeholder="«Я знаю, хто мафія...»"
					bind:value={cardDescription}
				/>
			</div>

			<div class="form-group">
				<label class="text-gray">Зображення карти</label>
				<div class="upload-wrapper">
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
							<span>Завантажити картинку</span>
						</label>
					{/if}
				</div>
			</div>

			<div class="action-buttons">
				<button type="button" class="link-style red submit-btn-override" on:click={handleSubmit}>
					<svelte:component
						this={editIndex !== null ? Icons.Check : Icons.Zap}
						size={18}
						color="#fff"
					/>
					<span>{editIndex !== null ? 'ЗБЕРЕГТИ ЗМІНИ' : 'ДОДАТИ В КОЛОДУ'}</span>
				</button>

				{#if editIndex !== null}
					<button class="cancel-btn text-white" on:click={resetForm}>Скасувати</button>
				{/if}
			</div>
		</section>
	</div>
</div>

<StandardLinks />

<BaseModal open={deleteModalOpen} on:close={() => (deleteModalOpen = false)}>
	<div class="modal-header-slot" slot="header">
		<svelte:component this={Icons.AlertTriangle} class="details-icon" color="#ef4444" />
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
	:global(body) {
		background-color: #0c0c0e !important;
		color: #ffffff !important;
	}

	.text-white {
		color: #ffffff !important;
	}
	.text-gray {
		color: #a1a1aa !important;
	}

	.constructor-wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 16px 12px 60px;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.main-header {
		margin-bottom: 24px;
		border-bottom: 1px solid #232326;
		padding-bottom: 12px;
	}

	.main-header h1 {
		font-size: 1.8rem;
		font-weight: 800;
		margin: 0;
	}

	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 24px;
		align-items: start;
	}

	@media (max-width: 950px) {
		.layout-grid {
			grid-template-columns: 1fr;
		}
		.form-section {
			order: -1; /* Форма зверху на мобілках для зручності додавання */
		}
	}

	.cards-section,
	.form-section {
		background: #111113;
		border-radius: 12px;
		padding: 20px;
		border: 1px solid #232326;
	}

	.cards-section {
		border: none;
		background: transparent;
		padding: 0;
	}

	.section-title {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0 0 16px;
	}

	/* СЕТКА СТВОРЕНИХ КАРТ */
	.cards-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
	}

	.game-card-item {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		border: 1px solid #232326;
	}

	/* Реальний вигляд карти (БІЛИЙ ФОН) */
	.real-game-card {
		background: #ffffff;
		height: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 16px;
		position: relative;
	}

	.card-main-img {
		width: 100%;
		height: 140px;
		object-fit: contain;
	}

	.card-graphic-fallback {
		height: 140px;
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
		font-size: 0.9rem;
		font-style: italic;
		font-weight: 600;
		margin: 0;
		line-height: 1.3;
		word-break: break-word;
	}

	/* Нижня темна панель карти з тегом та кнопками */
	.card-meta-panel {
		background: #161619;
		padding: 10px 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-top: 1px solid #232326;
	}

	.role-indicator-tag {
		background: #232326;
		color: #e4e4e7;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.meta-actions {
		display: flex;
		gap: 6px;
	}

	.action-icon-btn {
		background: #232326;
		border: none;
		color: #a1a1aa;
		width: 28px;
		height: 28px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s;
	}

	.action-icon-btn.edit:hover {
		background: #3f3f46;
		color: #fff;
	}
	.action-icon-btn.delete:hover {
		background: #ef4444;
		color: #fff;
	}

	/* ФОРМА ТА СЕЛЕКТОРИ */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
		position: relative;
	}

	.form-group label {
		font-size: 0.85rem;
		font-weight: 600;
	}

	input[type='text'],
	textarea {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 11px;
		color: white !important;
		font-size: 0.9rem;
		outline: none;
	}

	input:focus,
	textarea:focus {
		border-color: #ff4444;
	}

	textarea {
		resize: vertical;
		min-height: 70px;
		max-height: 150px;
	}

	.char-counter {
		position: absolute;
		bottom: -16px;
		right: 4px;
		font-size: 0.7rem;
		color: #52525b;
	}

	/* Кнопка-тригер замість дефолтного селектора */
	.custom-select-trigger {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 11px;
		color: white;
		display: flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		font-size: 0.9rem;
		text-align: left;
	}
	.custom-select-trigger:focus {
		border-color: #ff4444;
	}

	.mode-selector {
		display: flex;
		background: #161619;
		padding: 4px;
		border-radius: 8px;
		margin-bottom: 18px;
		border: 1px solid #232326;
	}

	.mode-selector button {
		flex: 1;
		background: transparent;
		border: none;
		color: #a1a1aa;
		padding: 8px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
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
	}

	.icon-btn {
		background: #161619;
		border: 1px solid #232326;
		color: #a1a1aa;
		padding: 10px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-btn.selected {
		background: rgba(255, 68, 68, 0.12);
		border-color: #ff4444;
		color: #ff4444;
	}

	.divider {
		height: 1px;
		background: #232326;
		margin: 20px 0;
	}

	/* ЗАВАНТАЖЕННЯ МЕДІА */
	.upload-wrapper {
		border: 2px dashed #232326;
		border-radius: 8px;
		background: #161619;
	}

	.upload-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 24px;
		cursor: pointer;
		color: #71717a;
		font-size: 0.85rem;
	}

	.upload-area input {
		display: none;
	}

	.image-preview {
		padding: 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image-preview img {
		max-height: 110px;
		object-fit: contain;
		border-radius: 6px;
		margin-bottom: 8px;
	}

	.remove-img-btn {
		background: #232326;
		border: none;
		color: #f43f5e;
		padding: 5px 12px;
		font-size: 0.8rem;
		border-radius: 6px;
		cursor: pointer;
		font-weight: 600;
	}

	/* КНОПКИ ДІЙ */
	.action-buttons {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 20px;
	}

	.submit-btn-override {
		width: 100% !important;
		min-height: 42px !important;
		display: flex !important;
		align-items: center !important;
		justify-content: center !important;
		gap: 8px !important;
		border-radius: 8px !important;
		font-weight: 700 !important;
		cursor: pointer;
	}

	.cancel-btn {
		background: transparent;
		border: 1px solid #232326;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.empty-state {
		text-align: center;
		padding: 40px 20px;
		color: #52525b;
		font-size: 0.95rem;
		border: 1px dashed #232326;
		border-radius: 12px;
	}

	.hint {
		font-size: 0.85rem;
		color: #3f3f46;
		margin-top: 4px;
	}

	/* ОФОРМЛЕННЯ МОДАЛКИ ВИДАНЕННЯ */
	.modal-header-slot {
		display: flex;
		align-items: center;
		gap: 12px;
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
		padding: 10px 0 0;
	}
	.modal-actions-row {
		display: flex;
		gap: 10px;
		margin-top: 20px;
	}
	.modal-btn {
		flex: 1;
		padding: 10px;
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
