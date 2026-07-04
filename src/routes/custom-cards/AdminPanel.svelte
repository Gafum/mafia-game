<script>
	import cardRulesConstData from '$lib/data/cardRulesConst.json';
	import cardListData from '$lib/data/cardList.json';
	import bigDescriptionListData from '$lib/data/bigDescriptionList.json';
	import { Plus, Trash2, Upload, Save, CircleQuestionMark } from 'lucide-svelte';
	import * as LucideIcons from 'lucide-svelte';
	import { Icons as CustomIcons } from '$lib/components/icons.js';
	import { tick } from 'svelte';

	const Icons = { ...LucideIcons, ...CustomIcons };

	let cardRulesConst = { ...cardRulesConstData };
	let cardList = [...cardListData];
	let bigDescriptionList = JSON.parse(JSON.stringify(bigDescriptionListData));

	let isSaving = false;
	let saveStatus = '';
	let errorStatus = '';

	let newRoleKeyEnglish = '';
	let filesToUploadMap = {};
	let localPreviewsMap = {};

	async function handleCreateRole() {
		const cleanKey = newRoleKeyEnglish.trim().toLowerCase();
		if (!cleanKey) {
			errorStatus = 'Введіть коректний ключ!';
			return;
		}
		if (bigDescriptionList[cleanKey]) {
			errorStatus = 'Цей системний ключ уже існує!';
			return;
		}

		errorStatus = '';

		bigDescriptionList[cleanKey] = {
			name: cleanKey.toUpperCase(),
			icon: 'User',
			description: ''
		};

		// Fix: strictly default to boolean false instead of a number
		cardRulesConst[cleanKey] = false;

		bigDescriptionList = { ...bigDescriptionList };
		cardRulesConst = { ...cardRulesConst };
		newRoleKeyEnglish = '';

		await tick();
		const targetElement = document.getElementById(`role-block-${cleanKey}`);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	function handleRemoveRole(roleKey) {
		// Protection block for master gameplay dependencies
		if (roleKey === 'mans' || roleKey === 'mafias') {
			alert('Заборонено видаляти базові ролі міста (mans, mafias)!');
			return;
		}

		if (
			confirm(`Видалити роль "${bigDescriptionList[roleKey]?.name || roleKey}" та всі її картки?`)
		) {
			delete bigDescriptionList[roleKey];
			delete cardRulesConst[roleKey];
			cardList = cardList.filter((c) => c.tag !== roleKey);

			bigDescriptionList = { ...bigDescriptionList };
			cardRulesConst = { ...cardRulesConst };
		}
	}

	/**
	 * Safe index counter with special naming overrides for core factions
	 */
	function getNextImageName(roleKey) {
		const currentCardsCount = cardList.filter((c) => c.tag === roleKey).length;

		let prefix = '';
		if (roleKey === 'mafias') {
			prefix = 'Mafia';
		} else if (roleKey === 'mans') {
			prefix = 'Man';
		} else {
			prefix = roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
		}

		return `${prefix}${currentCardsCount + 1}`;
	}

	function handleAddCardToRole(roleKey) {
		cardList = [
			...cardList,
			{
				description: 'Нова фраза для картки',
				myImg: getNextImageName(roleKey),
				tag: roleKey,
				isNew: true // State indicator for handling placeholder triggers
			}
		];
	}

	function handleRemoveCard(index) {
		cardList = cardList.filter((_, i) => i !== index);
		delete filesToUploadMap[index];
		delete localPreviewsMap[index];
	}

	function handleFileSelected(event, cardIndex) {
		const file = event.target.files[0];
		if (!file) return;

		filesToUploadMap[cardIndex] = file;
		localPreviewsMap[cardIndex] = URL.createObjectURL(file);

		// Once image chosen, it's no longer considered functionally empty
		if (cardList[cardIndex]) {
			cardList[cardIndex].isNew = false;
		}
	}

	async function handleSaveData() {
		isSaving = true;
		saveStatus = 'Збереження конфігурації та синхронізація ...';

		const roleOrder = Object.keys(cardRulesConst);

		const sortedCardList = [...cardList].sort((a, b) => {
			let indexA = roleOrder.indexOf(a.tag);
			let indexB = roleOrder.indexOf(b.tag);
			if (indexA === -1) indexA = 999;
			if (indexB === -1) indexB = 999;
			return indexA - indexB;
		});

		const cleanCardList = sortedCardList.map(({ isNew, ...rest }) => rest);

		const payload = new FormData();
		payload.append('cardRulesConst', JSON.stringify(cardRulesConst));
		payload.append('cardList', JSON.stringify(cleanCardList));
		payload.append('bigDescriptionList', JSON.stringify(bigDescriptionList));

		Object.keys(filesToUploadMap).forEach((idx) => {
			const targetFilename = cardList[idx].myImg;
			if (targetFilename) {
				payload.append(`file_${targetFilename}`, filesToUploadMap[idx]);
			}
		});

		try {
			const res = await fetch('/api/admin/save', {
				method: 'POST',
				body: payload
			});

			if (res.ok) {
				saveStatus = 'Зміни успішно синхронізовано з диском!';
				filesToUploadMap = {};
				localPreviewsMap = {};

				cardList = sortedCardList.map(({ isNew, ...rest }) => rest);
			} else {
				const errData = await res.json();
				saveStatus = `Помилка: ${errData.error || 'Провал збереження'}`;
			}
		} catch (e) {
			saveStatus = `Помилка з'єднання: ${e.message}`;
		} finally {
			isSaving = false;
			setTimeout(() => {
				saveStatus = '';
			}, 4000);
		}
	}
</script>

<div class="constructor-wrapper">
	{#if saveStatus}
		<div class="form-section status-alert animate-fade">
			<strong>{saveStatus}</strong>
		</div>
	{/if}

	<div class="layout-grid">
		<div class="cards-section">
			<div class="roles-accumulator">
				{#each Object.keys(bigDescriptionList) as roleKey}
					<div class="form-section role-card-wrapper" id="role-block-{roleKey}">
						<div class="role-header-top">
							<div class="role-key-badge">
								<span class="badge-label">КЛЮЧ:</span>
								<span class="badge-value">{roleKey}</span>
							</div>

							{#if roleKey !== 'mans' && roleKey !== 'mafias'}
								<button
									class="action-icon-btn remove-role-btn"
									title="Видалити роль"
									on:click={() => handleRemoveRole(roleKey)}
								>
									<Trash2 size={16} />
								</button>
							{/if}
						</div>

						<div class="role-inputs-grid">
							<div class="form-group">
								<label for="name-{roleKey}">Назва Ролі (Укр)</label>
								<input
									type="text"
									id="name-{roleKey}"
									bind:value={bigDescriptionList[roleKey].name}
								/>
							</div>

							<div class="form-group">
								<label for="icon-{roleKey}">Lucide Іконка</label>
								<div class="icon-input-inline-wrapper">
									<input
										type="text"
										id="icon-{roleKey}"
										bind:value={bigDescriptionList[roleKey].icon}
										placeholder="Shield, User, Brain..."
									/>
									<div class="inline-icon-preview-box">
										<svelte:component
											this={Icons[bigDescriptionList[roleKey].icon] || CircleQuestionMark}
											size={18}
											style="stroke: #fff;"
											color="#fff"
											strokeWidth={2.5}
										/>
									</div>
								</div>
							</div>
						</div>

						<div class="form-group" style="margin-bottom: 24px;">
							<label for="desc-{roleKey}">Опис механіки ролі</label>
							<textarea
								id="desc-{roleKey}"
								bind:value={bigDescriptionList[roleKey].description}
								rows="3"
							/>
						</div>

						<div>
							<h3 class="cards-section-title">Стандартні Картки цієї ролі:</h3>

							<div class="cards-layout">
								{#each cardList as card, index}
									{#if card.tag === roleKey}
										<div class="game-card-item">
											<div class="real-game-card">
												<div class="card-icon-overlay">
													<svelte:component
														this={Icons[bigDescriptionList[roleKey].icon] || CircleQuestionMark}
														size={18}
														style="stroke: #000;"
														color="#000"
														strokeWidth={2.5}
													/>
												</div>

												<div class="card-img-wrapper">
													{#if card.isNew && !localPreviewsMap[index]}
														<div class="card-graphic-fallback">
															<span class="placeholder-text"
																>краще використати<br />картинку 512x512</span
															>
														</div>
													{:else if localPreviewsMap[index]}
														<img
															src={localPreviewsMap[index]}
															alt="Preview"
															class="card-main-img"
														/>
													{:else}
														<img
															src="/assets/cards/{card.myImg}.png"
															alt="Card Asset"
															class="card-main-img"
															on:error={(e) => {
																e.target.style.display = 'none';
																e.target.nextElementSibling.style.display = 'flex';
															}}
														/>
													{/if}
												</div>
												<div class="card-text-content">
													<p class="game-phrase">{card.description || 'Відсутній опис...'}</p>
												</div>
											</div>

											<div class="card-meta-panel">
												<input
													type="text"
													class="card-phrase-input"
													placeholder="Фраза на картці"
													bind:value={card.description}
												/>

												<div class="card-actions-row">
													<label class="upload-wrapper">
														<div class="upload-area">
															<Upload size={12} style="stroke: #000;" strokeWidth="3" />
															<span class="upload-btn-text">
																{#if card.isNew && !localPreviewsMap[index]}
																	Додати фото
																{:else}
																	Оновити фото
																{/if}
															</span>
															<input
																type="file"
																accept="image/png"
																on:change={(e) => handleFileSelected(e, index)}
															/>
														</div>
													</label>
													<button
														class="action-icon-btn remove-card-btn"
														on:click={() => handleRemoveCard(index)}
													>
														<Trash2 size={14} />
													</button>
												</div>
											</div>
										</div>
									{/if}
								{/each}

								<button class="add-card-slot" on:click={() => handleAddCardToRole(roleKey)}>
									<Plus size={24} style="color: #ff4444;" />
									<span class="add-slot-text">Додати картку</span>
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="workspace-sidebar">
			<div class="form-section new-role-section">
				<h2 class="sidebar-title highlight">Нова роль</h2>
				<div class="form-group">
					<label for="english-key">Системний Ключ (English Only)</label>
					<input
						type="text"
						id="english-key"
						placeholder="lawyer, maniac, agent"
						bind:value={newRoleKeyEnglish}
						on:input={() =>
							(newRoleKeyEnglish = newRoleKeyEnglish.replace(/[^a-zA-Z_]/g, '').toLowerCase())}
						on:keydown={(e) => e.key === 'Enter' && handleCreateRole()}
					/>
					<span class="hint">Валідатор автоматично вирізає пробіли, цифри та кирилицю.</span>
					{#if errorStatus}
						<span class="error-text">{errorStatus}</span>
					{/if}
				</div>
				<button class="create-role-btn" on:click={handleCreateRole}>
					Створити <span class="inherit-text mobile-hidden-icon">Рольовий Блок</span>
				</button>
			</div>

			<div class="form-section role-config-section">
				<h2 class="sidebar-title">Максимальні ліміти та стани</h2>
				<div class="limits-list">
					{#each Object.keys(cardRulesConst) as balanceKey}
						<div class="limit-row">
							<span class="limit-key">{balanceKey}</span>
							<div>
								{#if typeof cardRulesConst[balanceKey] === 'boolean'}
									<input
										type="checkbox"
										class="limit-checkbox"
										bind:checked={cardRulesConst[balanceKey]}
									/>
								{:else}
									<input
										type="number"
										class="limit-number"
										bind:value={cardRulesConst[balanceKey]}
									/>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<button class="save-master-btn" on:click={handleSaveData} disabled={isSaving}>
				<Save size={20} />
				{#if isSaving}
					Запис...
				{:else}
					<span class="inherit-text">
						Зберегти <span class="inherit-text mobile-hidden-icon">зміни у файли</span>
					</span>
				{/if}
			</button>
		</div>
	</div>
</div>

<style>
	.layout-grid {
		display: grid;
		grid-template-columns: 1fr 360px;
		gap: 24px;
		align-items: start;
	}

	/* FIXED SIDEBAR SCROLL COUPLING */
	.workspace-sidebar {
		position: sticky;
		top: 24px;
		max-height: 75vh;
		max-height: 80svh;
		max-height: calc(90svh - 80px);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-self: start;
		padding-right: 4px;
	}

	/* SCROLLBAR STYLE FOR SIDEBAR */
	.workspace-sidebar::-webkit-scrollbar {
		width: 6px;
	}
	.workspace-sidebar::-webkit-scrollbar-track {
		background: #111113;
		border-radius: 10px;
	}
	.workspace-sidebar::-webkit-scrollbar-thumb {
		background: #232326;
		border-radius: 10px;
	}
	.workspace-sidebar::-webkit-scrollbar-thumb:hover {
		background: #ff4444;
	}

	.roles-accumulator {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.form-section {
		background: #111113;
		border-radius: 12px;
		padding: 20px;
		border: 1px solid #232326;
		box-sizing: border-box;
		transition: border-color 0.2s;
		overflow: hidden;
	}
	.form-section:hover {
		border-color: #333338;
	}

	.new-role-section {
		flex-shrink: 1;
	}

	.role-config-section {
		display: flex;
		flex-direction: column;
		min-height: 0;
		flex-shrink: 10;
	}

	.status-alert {
		text-align: center;
		color: #ffffff;
		border-color: #ff4444;
		margin-bottom: 24px;
		font-size: 1.1rem;
		background: rgba(255, 68, 68, 0.05);
	}

	/* TYPOGRAPHY */
	.sidebar-title {
		color: #ffffff;
		font-size: 1.2rem;
		font-weight: 700;
		margin: 0 0 16px;
	}
	.sidebar-title.highlight {
		color: #ff4444;
	}
	.cards-section-title {
		color: #ffffff;
		font-size: 1rem;
		font-weight: 700;
		margin: 0 0 16px 0;
	}
	.hint {
		font-size: 0.72rem;
		color: #71717a;
		margin-top: 4px;
		line-height: 1.3;
		display: block;
	}
	.error-text {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 6px;
		font-weight: 600;
		display: block;
	}

	/* FORMS & INLINE PREVIEW MODULE */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: 16px;
		width: 100%;
		box-sizing: border-box;
	}
	.form-group label {
		color: #a1a1aa;
		font-size: 0.85rem;
		font-weight: 600;
	}

	.icon-input-inline-wrapper {
		display: flex;
		position: relative;
		align-items: center;
		width: 100%;
	}
	.inline-icon-preview-box {
		position: absolute;
		top: 10px;
		right: 12px;
	}

	input[type='text'],
	textarea {
		background: #161619;
		border: 1px solid #232326;
		border-radius: 8px;
		padding: 11px 12px;
		color: #ffffff;
		font-size: 0.9rem;
		outline: none;
		width: 100%;
		box-sizing: border-box;
		transition: all 0.2s;
	}
	textarea {
		min-height: 50px;
		resize: vertical;
	}
	input[type='text']:focus,
	textarea:focus {
		border-color: #ff4444;
		background: #1a1a1e;
	}

	/* HEADER & BADGES */
	.role-header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		padding-bottom: 16px;
		border-bottom: 1px solid #232326;
	}
	.role-key-badge {
		display: flex;
		align-items: center;
		background: #232326;
		border-radius: 6px;
		overflow: hidden;
		border: 1px solid #3f3f46;
	}
	.badge-label {
		background: #ff4444;
		color: #ffffff;
		font-size: 0.75rem;
		font-weight: 800;
		padding: 7px 10px;
		letter-spacing: 0.5px;
	}
	.inherit-text {
		color: inherit;
		font-size: inherit;
		font-weight: inherit;
	}
	.badge-value {
		color: #ffffff;
		font-size: 1.05rem;
		font-weight: 800;
		padding: 4px 12px;
		text-transform: lowercase;
		font-family: monospace;
	}

	.role-inputs-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		margin-bottom: 16px;
	}

	/* INTERACTIVE TRIGGERS & HOVERS + ACTIVE STATES */
	.action-icon-btn {
		background: #232326;
		border: none;
		color: #a1a1aa;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.1s ease-in-out;
	}
	.action-icon-btn:hover {
		background: #2f2f33;
		color: #ffffff;
	}
	.action-icon-btn:active {
		transform: scale(0.92);
	}

	.remove-role-btn {
		width: 34px;
		height: 34px;
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}
	.remove-role-btn:hover {
		background: #ef4444;
		color: #ffffff;
	}

	.remove-card-btn {
		width: 32px;
		height: 32px;
		background: rgba(244, 63, 94, 0.1);
		color: #f43f5e;
	}
	.remove-card-btn:hover {
		background: #f43f5e;
		color: #ffffff;
	}

	.create-role-btn {
		width: 100%;
		background: #ff4444;
		color: #ffffff;
		border: none;
		padding: 12px;
		border-radius: 8px;
		font-weight: 700;
		font-size: 0.95rem;
		cursor: pointer;
		transition: background 0.2s;
	}
	.create-role-btn:hover {
		background: #e63946;
	}
	.create-role-btn:active {
		transform: scale(0.97);
	}

	.save-master-btn {
		width: 100%;
		background: #ff4444;
		color: #ffffff;
		border: none;
		padding: 16px;
		border-radius: 12px;
		font-weight: 800;
		font-size: 1.1rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		transition: all 0.2s;
		box-shadow: 0 4px 15px rgba(255, 68, 68, 0.2);
	}
	.save-master-btn:hover:not(:disabled) {
		background: #e63946;
		transform: translateY(-1px);
	}
	.save-master-btn:active:not(:disabled) {
		transform: translateY(1px) scale(0.98);
	}
	.save-master-btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	/* LIMITS PANELS */
	.limits-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
		overflow: auto;
		padding-right: 5px;
	}
	.limit-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 12px;
		background: #161619;
		border-radius: 8px;
		border: 1px solid #232326;
	}
	.limit-key {
		color: #ffffff;
		font-size: 0.9rem;
		font-family: monospace;
	}
	.limit-checkbox {
		accent-color: #ff4444;
		width: 18px;
		height: 18px;
		cursor: pointer;
	}
	.limit-number {
		width: 70px;
		background: #111113;
		border: 1px solid #3f3f46;
		color: #ffffff;
		border-radius: 6px;
		padding: 6px;
		text-align: center;
		font-weight: 600;
		outline: none;
	}

	/* CARDS SECTIONS GRID */
	.cards-layout {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
		gap: 16px;
	}

	.game-card-item {
		display: flex;
		flex-direction: column;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		border: 1px solid #232326;
		background: #111113;
		transition: transform 0.2s, border-color 0.2s;
	}
	.game-card-item:hover {
		transform: translateY(-3px);
		border-color: #3f3f46;
	}

	.real-game-card {
		background: #ffffff;
		height: 190px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 14px;
		position: relative;
		box-sizing: border-box;
	}
	.card-icon-overlay {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 2;
		opacity: 0.85;
	}

	.card-img-wrapper {
		width: 100%;
		height: 130px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.card-main-img {
		border-radius: 8px;
		height: 100%;
		width: auto;
		max-width: 100%;
		object-fit: contain;
	}

	.card-graphic-fallback {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f4f4f5;
		border-radius: 8px;
		border: 1px dashed #d4d4d8;
		box-sizing: border-box;
		padding: 4px;
	}
	.placeholder-text {
		color: #a1a1aa;
		font-size: 0.72rem;
		text-align: center;
		font-weight: 700;
		line-height: 1.4;
		text-transform: uppercase;
	}

	.card-text-content {
		width: 100%;
		text-align: center;
		margin-top: auto;
	}
	.game-phrase {
		color: #111111;
		font-size: 0.85rem;
		font-weight: 700;
		margin: 0;
		line-height: 1.3;
		display: -webkit-box;
		line-clamp: 3;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-meta-panel {
		background: #161619;
		padding: 12px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		border-top: 1px solid #232326;
	}
	.card-phrase-input {
		font-size: 0.8rem !important;
		padding: 8px !important;
	}

	.card-actions-row {
		display: flex;
		gap: 8px;
		align-items: center;
		justify-content: space-between;
	}

	/* EXPLICIT UPLOAD STYLES (BLACK FONT, SMALL, NO WRAPPING) */
	.upload-wrapper {
		background: #ffffff;
		border-radius: 6px;
		flex: 1;
		box-sizing: border-box;
		transition: all 0.2s;
		cursor: pointer;
		border: 1px solid #ffffff;
	}
	.upload-wrapper:hover {
		background: #e4e4e7;
		border-color: #e4e4e7;
	}
	.upload-wrapper:active {
		transform: scale(0.96);
	}

	.upload-area {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		padding: 8px 4px;
		cursor: pointer;
		box-sizing: border-box;
	}
	.upload-btn-text {
		color: #000000 !important;
		font-size: 0.72rem;
		font-weight: 800;
		white-space: nowrap;
		text-transform: uppercase;
		letter-spacing: -0.2px;
	}
	.upload-area input {
		display: none;
	}

	.add-card-slot {
		background: #161619;
		border: 1px dashed #3f3f46;
		border-radius: 12px;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 12px;
		min-height: 250px;
		transition: all 0.2s;
	}
	.add-card-slot:hover {
		border-color: #ff4444;
		background: #1a1a1e;
		transform: translateY(-3px);
	}
	.add-card-slot:active {
		transform: scale(0.97);
	}
	.add-slot-text {
		color: #a1a1aa;
		font-size: 0.9rem;
		font-weight: 600;
	}
	.add-card-slot:hover .add-slot-text {
		color: #ffffff;
	}

	.animate-fade {
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(5px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media screen and (max-width: 950px), screen and (max-height: 700px) {
		.layout-grid {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.workspace-sidebar {
			position: static;
			max-height: none;
			overflow-y: visible;
			order: -1;
		}
	}

	@media (max-width: 480px) {
		.role-inputs-grid {
			grid-template-columns: 1fr;
			gap: 0;
			margin-bottom: 0;
		}
	}
</style>
