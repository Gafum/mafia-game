<!-- src/routes/custom-cards/+page.svelte -->
<script>
	import { onMount } from 'svelte';
	import {
		customCardsStore,
		addCustomCard,
		updateCustomCard,
		deleteCustomCard,
		addCustomDescription,
		addCustomRule,
		bigDescriptions
	} from '$lib/stores';
	import { writable } from 'svelte/store';
	import {
		Shield,
		Crosshair,
		HeartPulse,
		UserCheck,
		Briefcase,
		Bomb,
		HatGlasses,
		User,
		Drama,
		Brain,
		ArrowLeft,
		Plus,
		Trash2,
		Edit2,
		Upload
	} from 'lucide-svelte';

	// Available icons mapping
	const availableIcons = [
		{ name: 'User', component: User, label: 'Громадянин' },
		{ name: 'HatGlasses', component: HatGlasses, label: 'Окуляри/Капелюх' },
		{ name: 'Shield', component: Shield, label: 'Шериф' },
		{ name: 'HeartPulse', component: HeartPulse, label: 'Серце/Лікар' },
		{ name: 'Bomb', component: Bomb, label: 'Бомба' },
		{ name: 'Crosshair', component: Crosshair, label: 'Приціл' },
		{ name: 'UserCheck', component: UserCheck, label: 'Захисник' },
		{ name: 'Briefcase', component: Briefcase, label: 'Портфель' },
		{ name: 'Drama', component: Drama, label: 'Маска/Агент' },
		{ name: 'Brain', component: Brain, label: 'Мозок' }
	];

	const builtInRoles = [
		{ tag: 'mans', name: 'Мирний' },
		{ tag: 'mafias', name: 'Мафія' },
		{ tag: 'cop', name: 'Шериф' },
		{ tag: 'doctor', name: 'Лікар' },
		{ tag: 'kamikaze', name: 'Камікадзе' },
		{ tag: 'maniac', name: 'Маньяк' },
		{ tag: 'security', name: 'Охоронець' },
		{ tag: 'lawyer', name: 'Адвокат' },
		{ tag: 'agent', name: 'Агент' },
		{ tag: 'idiot', name: 'Дурачок' }
	];

	// Combine built-in roles with dynamic ones
	$: allRoles = [
		...builtInRoles,
		...Object.entries($bigDescriptions)
			.filter(([tag]) => !builtInRoles.some((r) => r.tag === tag))
			.map(([tag, desc]) => ({ tag, name: desc.name }))
	];

	// Form mode: 'assign' (existing role) or 'create' (new role)
	let mode = 'assign';

	// Form fields
	let cardDescription = '';
	let selectedTag = 'mans';
	let imageBase64 = '';

	// New role fields
	let newRoleName = '';
	let newRoleTag = '';
	let newRoleDescription = '';
	let selectedIconName = 'User';

	// Edit Mode state
	let editIndex = null;

	// Cards list
	let cardsList = [];
	customCardsStore.subscribe((val) => {
		cardsList = val || [];
	});

	// Handle Image upload and convert to base64
	function handleImageChange(event) {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				imageBase64 = reader.result;
			};
			reader.readAsDataURL(file);
		}
	}

	function resetForm() {
		cardDescription = '';
		selectedTag = 'mans';
		imageBase64 = '';
		newRoleName = '';
		newRoleTag = '';
		newRoleDescription = '';
		selectedIconName = 'User';
		mode = 'assign';
		editIndex = null;
	}

	function handleSubmit() {
		if (!cardDescription.trim()) {
			alert('Будь ласка, введіть опис карти!');
			return;
		}

		let tagToUse = selectedTag;

		if (mode === 'create') {
			if (!newRoleName.trim()) {
				alert('Будь ласка, введіть назву нової ролі!');
				return;
			}
			if (!newRoleTag.trim()) {
				alert('Будь ласка, введіть унікальний ідентифікатор ролі!');
				return;
			}

			// Clean tag
			tagToUse = newRoleTag
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9_]/g, '');

			// Register role metadata
			addCustomDescription(tagToUse, {
				name: newRoleName,
				description: newRoleDescription || 'Спеціальна роль гри.',
				iconName: selectedIconName
			});

			// Register rule status toggle
			addCustomRule(tagToUse, true);
		}

		const cardData = {
			description: cardDescription,
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
		const card = cardsList[index];
		cardDescription = card.description;
		imageBase64 = card.myImg.startsWith('data:') ? card.myImg : '';
		selectedTag = card.tag;
		editIndex = index;

		// Check if it's a custom role description
		const isBuiltIn = builtInRoles.some((r) => r.tag === card.tag);
		if (!isBuiltIn && $bigDescriptions[card.tag]) {
			mode = 'create';
			newRoleName = $bigDescriptions[card.tag].name || '';
			newRoleTag = card.tag;
			newRoleDescription = $bigDescriptions[card.tag].description || '';
			// find icon
			const matchedIcon = availableIcons.find(
				(icon) => icon.component === $bigDescriptions[card.tag].icon
			);
			selectedIconName = matchedIcon ? matchedIcon.name : 'User';
		} else {
			mode = 'assign';
		}
	}

	function handleDelete(index) {
		if (confirm('Ви впевнені, що хочете видалити цю карту?')) {
			deleteCustomCard(index);
		}
	}
</script>

<div class="custom-cards-container">
	<!-- HEADER -->
	<header class="header">
		<a href="/settings" class="back-btn">
			<ArrowLeft size={20} />
			<span>Назад до налаштувань</span>
		</a>
		<h1>Створення власних карт / ролей</h1>
		<p class="subtitle">
			Розширюйте можливості вашої мафії новими картами та унікальними правилами
		</p>
	</header>

	<div class="main-grid">
		<!-- FORM PANEL -->
		<section class="panel form-panel">
			<h2>{editIndex !== null ? 'Редагувати карту' : 'Створити нову карту'}</h2>

			<div class="form-group">
				<label for="desc">Фраза на карті (опис персонажа)</label>
				<input
					type="text"
					id="desc"
					placeholder="Наприклад: 'Ти забагато знаєш...'"
					bind:value={cardDescription}
				/>
			</div>

			<!-- Image Upload with Preview -->
			<div class="form-group">
				<label for="card-image">Зображення карти</label>
				<div class="upload-wrapper">
					{#if imageBase64}
						<div class="image-preview">
							<img src={imageBase64} alt="Preview" />
							<button class="remove-img-btn" on:click={() => (imageBase64 = '')}>Видалити</button>
						</div>
					{:else}
						<label class="upload-area">
							<input type="file" accept="image/*" on:change={handleImageChange} />
							<Upload size={24} />
							<span>Завантажити фото</span>
						</label>
					{/if}
				</div>
			</div>

			<!-- MODE SELECTOR -->
			<div class="mode-selector">
				<button type="button" class:active={mode === 'assign'} on:click={() => (mode = 'assign')}>
					Прив'язати до існуючої ролі
				</button>
				<button type="button" class:active={mode === 'create'} on:click={() => (mode = 'create')}>
					Створити абсолютно нову роль
				</button>
			</div>

			{#if mode === 'assign'}
				<div class="form-group animate-fade">
					<label for="role-select">Оберіть роль для цієї карти</label>
					<select id="role-select" bind:value={selectedTag}>
						{#each allRoles as role}
							<option value={role.tag}>{role.name}</option>
						{/each}
					</select>
				</div>
			{:else}
				<div class="new-role-fields animate-fade">
					<div class="form-group">
						<label for="role-name">Назва ролі</label>
						<input
							type="text"
							id="role-name"
							placeholder="Наприклад: Кілер, Босс, Журналіст"
							bind:value={newRoleName}
						/>
					</div>

					<div class="form-group">
						<label for="role-id">Унікальний ID ролі (англійською)</label>
						<input
							type="text"
							id="role-id"
							placeholder="Наприклад: killer, boss, journalist"
							bind:value={newRoleTag}
						/>
					</div>

					<div class="form-group">
						<label for="role-desc">Опис здібностей ролі</label>
						<textarea
							id="role-desc"
							rows="3"
							placeholder="Опишіть правила або хід цієї ролі під час гри..."
							bind:value={newRoleDescription}
						/>
					</div>

					<div class="form-group">
						<label for="role-icon">Оберіть іконку ролі</label>
						<div class="icon-selector-grid">
							{#each availableIcons as icon}
								<button
									id="role-icon"
									type="button"
									class="icon-btn"
									class:selected={selectedIconName === icon.name}
									on:click={() => (selectedIconName = icon.name)}
									title={icon.label}
								>
									<svelte:component this={icon.component} size={20} />
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}

			<div class="action-buttons">
				<button class="primary-btn" on:click={handleSubmit}>
					<Plus size={18} />
					<span>{editIndex !== null ? 'Зберегти зміни' : 'Додати карту'}</span>
				</button>
				{#if editIndex !== null}
					<button class="cancel-btn" on:click={resetForm}>Скасувати</button>
				{/if}
			</div>
		</section>

		<!-- LIST PANEL -->
		<section class="panel list-panel">
			<h2>Ваші кастомні карти ({cardsList.length})</h2>

			{#if cardsList.length === 0}
				<div class="empty-state">
					<p>Ви ще не створили жодної карти.</p>
					<p class="hint">Використовуйте форму ліворуч, щоб створити свій перший персонаж!</p>
				</div>
			{:else}
				<div class="cards-grid">
					{#each cardsList as card, idx}
						<div class="custom-card-item">
							<div class="card-image-box">
								{#if card.myImg && card.myImg.startsWith('data:')}
									<img src={card.myImg} alt="Card preview" />
								{:else}
									<div class="card-image-fallback">
										<User size={32} />
									</div>
								{/if}
								<span class="role-badge">
									{$bigDescriptions[card.tag]?.name || card.tag}
								</span>
							</div>
							<div class="card-info">
								<p class="card-phrase">"{card.description}"</p>
								<div class="card-controls">
									<button class="edit-btn" on:click={() => handleEdit(idx)} title="Редагувати">
										<Edit2 size={16} />
									</button>
									<button class="delete-btn" on:click={() => handleDelete(idx)} title="Видалити">
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>

<style>
	:global(body) {
		background-color: #0c0c0e !important;
		color: #ffffff !important;
	}

	.custom-cards-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 24px 16px 60px;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		color: #ffffff;
	}

	.header {
		margin-bottom: 30px;
		border-bottom: 1px solid rgba(255, 68, 68, 0.2);
		padding-bottom: 20px;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: #ff4444;
		text-decoration: none;
		font-size: 0.95rem;
		margin-bottom: 15px;
		transition: color 0.2s ease;
	}

	.back-btn:hover {
		color: #ff6666;
	}

	h1 {
		font-size: 2.2rem;
		font-weight: 800;
		color: #ffffff;
		margin: 0 0 8px;
		letter-spacing: -0.5px;
	}

	.subtitle {
		color: #a0a0ab;
		font-size: 1.1rem;
		margin: 0;
	}

	.main-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30px;
		align-items: start;
	}

	@media (max-width: 900px) {
		.main-grid {
			grid-template-columns: 1fr;
		}
	}

	.panel {
		background: rgba(20, 20, 22, 0.95);
		border: 1px solid #27272a;
		border-top: 4px solid #ff4444;
		border-radius: 12px;
		padding: 25px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.panel h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ffffff;
		margin: 0 0 20px;
		border-bottom: 1px solid #27272a;
		padding-bottom: 10px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 20px;
	}

	.form-group label {
		font-size: 0.9rem;
		font-weight: 600;
		color: #d4d4d8;
	}

	input[type='text'],
	select,
	textarea {
		background: #18181b;
		border: 1px solid #3f3f46;
		border-radius: 8px;
		padding: 12px;
		color: #ffffff;
		font-size: 0.95rem;
		outline: none;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	input[type='text']:focus,
	select:focus,
	textarea:focus {
		border-color: #ff4444;
		box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2);
	}

	/* Upload area */
	.upload-wrapper {
		border: 2px dashed #3f3f46;
		border-radius: 8px;
		background: #18181b;
		overflow: hidden;
		transition: border-color 0.2s ease;
	}

	.upload-wrapper:hover {
		border-color: #ff4444;
	}

	.upload-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 24px;
		cursor: pointer;
		color: #a1a1aa;
	}

	.upload-area input {
		display: none;
	}

	.image-preview {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px;
	}

	.image-preview img {
		max-width: 100%;
		max-height: 180px;
		border-radius: 6px;
		object-fit: contain;
		margin-bottom: 10px;
		border: 1px solid #3f3f46;
	}

	.remove-img-btn {
		background: #ef4444;
		color: #ffffff;
		border: none;
		border-radius: 6px;
		padding: 6px 12px;
		font-size: 0.85rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	.remove-img-btn:hover {
		background: #dc2626;
	}

	/* Mode Selector */
	.mode-selector {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
		border-bottom: 1px solid #27272a;
		padding-bottom: 15px;
	}

	.mode-selector button {
		flex: 1;
		background: #18181b;
		border: 1px solid #3f3f46;
		color: #a1a1aa;
		padding: 10px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
		transition: all 0.2s ease;
	}

	.mode-selector button.active {
		background: rgba(255, 68, 68, 0.1);
		border-color: #ff4444;
		color: #ffffff;
	}

	/* Icon selector */
	.icon-selector-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 8px;
	}

	.icon-btn {
		background: #18181b;
		border: 1px solid #3f3f46;
		color: #a1a1aa;
		aspect-ratio: 1;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.icon-btn:hover {
		border-color: #ff4444;
		color: #ffffff;
	}

	.icon-btn.selected {
		background: #ff4444;
		border-color: #ff4444;
		color: #ffffff;
		box-shadow: 0 0 10px rgba(255, 68, 68, 0.4);
	}

	/* Action Buttons */
	.action-buttons {
		display: flex;
		gap: 12px;
		margin-top: 25px;
	}

	.primary-btn {
		flex: 1;
		background: #ff4444;
		color: #ffffff;
		border: none;
		border-radius: 8px;
		padding: 12px;
		font-weight: 700;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		transition: background 0.2s ease, transform 0.1s ease;
	}

	.primary-btn:hover {
		background: #ff6666;
	}

	.primary-btn:active {
		transform: scale(0.98);
	}

	.cancel-btn {
		background: transparent;
		border: 1px solid #3f3f46;
		color: #d4d4d8;
		border-radius: 8px;
		padding: 12px 20px;
		cursor: pointer;
		font-weight: 600;
		transition: background 0.2s;
	}

	.cancel-btn:hover {
		background: rgba(255, 255, 255, 0.05);
	}

	/* Empty state */
	.empty-state {
		text-align: center;
		padding: 40px 20px;
		color: #71717a;
	}

	.empty-state p {
		margin: 0 0 8px;
		font-size: 1.1rem;
	}

	.empty-state .hint {
		font-size: 0.9rem;
		color: #52525b;
	}

	/* Cards List Grid */
	.cards-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
		max-height: 70vh;
		overflow-y: auto;
		padding-right: 4px;
		padding-top: 10px;
	}

	@media (max-width: 600px) {
		.cards-grid {
			grid-template-columns: 1fr;
		}
	}

	.custom-card-item {
		background: #18181b;
		border: 1px solid #27272a;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: transform 0.2s ease, border-color 0.2s ease;
	}

	.custom-card-item:hover {
		transform: translateY(-2px);
		border-color: #ff4444;
	}

	.card-image-box {
		height: 120px;
		background: #09090b;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1px solid #27272a;
	}

	.card-image-box img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.card-image-fallback {
		color: #3f3f46;
	}

	.role-badge {
		position: absolute;
		bottom: 8px;
		left: 8px;
		background: rgba(255, 68, 68, 0.95);
		color: #ffffff;
		padding: 3px 8px;
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	.card-info {
		padding: 12px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		gap: 10px;
	}

	.card-phrase {
		margin: 0;
		font-size: 0.95rem;
		font-style: italic;
		color: #e4e4e7;
		line-height: 1.4;
	}

	.card-controls {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
	}

	.edit-btn,
	.delete-btn {
		background: #27272a;
		border: 1px solid #3f3f46;
		color: #d4d4d8;
		width: 32px;
		height: 32px;
		border-radius: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.edit-btn:hover {
		background: #ff4444;
		border-color: #ff4444;
		color: #ffffff;
	}

	.delete-btn:hover {
		background: #ef4444;
		border-color: #ef4444;
		color: #ffffff;
	}

	.animate-fade {
		animation: fadeIn 0.25s ease-out;
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
</style>
