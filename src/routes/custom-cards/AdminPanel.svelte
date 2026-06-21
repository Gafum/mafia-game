<script>
	import cardRulesConstData from '$lib/data/cardRulesConst.json';
	import cardListData from '$lib/data/cardList.json';
	import bigDescriptionListData from '$lib/data/bigDescriptionList.json';
	import gameRulesData from '$lib/data/gameRules.json';

	let cardRulesConst = { ...cardRulesConstData };
	let cardList = [...cardListData];
	let bigDescriptionList = JSON.parse(JSON.stringify(bigDescriptionListData));
	let gameRules = [...gameRulesData];

	let isSaving = false;
	let saveStatus = '';

	async function saveData() {
		isSaving = true;
		saveStatus = 'Збереження...';
		try {
			const res = await fetch('/api/admin/save', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					cardRulesConst,
					cardList,
					bigDescriptionList,
					gameRules
				})
			});
			if (res.ok) {
				saveStatus = 'Успішно збережено! Файли оновлено.';
			} else {
				const data = await res.json();
				saveStatus = `Помилка: ${data.error || 'Не вдалося зберегти'}`;
			}
		} catch (e) {
			saveStatus = `Помилка: ${e.message}`;
		} finally {
			isSaving = false;
			setTimeout(() => {
				saveStatus = '';
			}, 3000);
		}
	}

	function addCard() {
		cardList = [...cardList, { description: '', myImg: '', tag: 'mans' }];
	}
	function removeCard(index) {
		cardList = cardList.filter((_, i) => i !== index);
	}

	function addGameRule() {
		gameRules = [...gameRules, ''];
	}
	function removeGameRule(index) {
		gameRules = gameRules.filter((_, i) => i !== index);
	}
</script>

<div class="admin-panel">
	<h2 class="text-white">Admin Panel (Local Only)</h2>

	<div class="panel-section">
		<h3>Card Rules / Limits</h3>
		<div class="rules-grid">
			{#each Object.keys(cardRulesConst) as key}
				<div class="input-group">
					<label for={key}>{key}</label>
					{#if typeof cardRulesConst[key] === 'boolean'}
						<input type="checkbox" bind:checked={cardRulesConst[key]} id={key} />
					{:else}
						<input type="number" bind:value={cardRulesConst[key]} id={key} />
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="panel-section">
		<h3>Standard Cards (cardList)</h3>
		{#each cardList as card, index}
			<div class="card-editor">
				<input type="text" placeholder="Description" bind:value={card.description} />
				<input type="text" placeholder="Image Name (myImg)" bind:value={card.myImg} />
				<input type="text" placeholder="Tag" bind:value={card.tag} />
				<button class="btn-remove" on:click={() => removeCard(index)}>Delete</button>
			</div>
		{/each}
		<button class="btn-add" on:click={addCard}>+ Add Standard Card</button>
	</div>

	<div class="panel-section">
		<h3>Roles (bigDescriptionList)</h3>
		{#each Object.keys(bigDescriptionList) as roleKey}
			<div class="role-editor">
				<h4>{roleKey}</h4>
				<input type="text" placeholder="Role Name" bind:value={bigDescriptionList[roleKey].name} />
				<input
					type="text"
					placeholder="Lucide Icon (e.g. Shield)"
					bind:value={bigDescriptionList[roleKey].icon}
				/>
				<textarea placeholder="Description" bind:value={bigDescriptionList[roleKey].description} />
			</div>
		{/each}
	</div>

	<div class="panel-section">
		<h3>Game Rules</h3>
		{#each gameRules as rule, index}
			<div class="rule-editor">
				<textarea bind:value={gameRules[index]} />
				<button class="btn-remove" on:click={() => removeGameRule(index)}>Delete</button>
			</div>
		{/each}
		<button class="btn-add" on:click={addGameRule}>+ Add Rule</button>
	</div>

	<div class="save-section">
		<button class="btn-save" on:click={saveData} disabled={isSaving}>
			{isSaving ? 'Saving...' : 'Save Standard Data'}
		</button>
		{#if saveStatus}
			<p class="status-msg text-white">{saveStatus}</p>
		{/if}
	</div>
</div>

<style>
	.admin-panel {
		background: #1e1e24;
		border-radius: 12px;
		padding: 20px;
		color: #e0e0e0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	.panel-section {
		background: #2a2a35;
		padding: 16px;
		border-radius: 8px;
	}
	.panel-section h3 {
		margin-top: 0;
		color: #fff;
		border-bottom: 1px solid #444;
		padding-bottom: 8px;
	}
	.rules-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 12px;
	}
	.input-group {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.input-group input[type='number'] {
		width: 100%;
		padding: 6px;
		border-radius: 4px;
		border: 1px solid #555;
		background: #1a1a1f;
		color: #fff;
	}
	.card-editor {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr auto;
		gap: 8px;
		margin-bottom: 8px;
	}
	.role-editor {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 16px;
		padding: 8px;
		background: #1f1f27;
		border-radius: 6px;
	}
	.role-editor h4 {
		margin: 0;
		color: #aaa;
	}
	.rule-editor {
		display: flex;
		gap: 8px;
		margin-bottom: 8px;
	}
	.rule-editor textarea,
	.role-editor textarea {
		flex: 1;
		min-height: 60px;
		padding: 8px;
		background: #1a1a1f;
		border: 1px solid #555;
		color: #fff;
		border-radius: 4px;
		resize: vertical;
	}
	input[type='text'] {
		padding: 8px;
		border-radius: 4px;
		border: 1px solid #555;
		background: #1a1a1f;
		color: #fff;
	}
	.btn-add {
		background: #3a86ff;
		color: #fff;
		border: none;
		padding: 8px 16px;
		border-radius: 4px;
		cursor: pointer;
	}
	.btn-remove {
		background: #ff006e;
		color: #fff;
		border: none;
		padding: 8px;
		border-radius: 4px;
		cursor: pointer;
	}
	.btn-save {
		background: #06d6a0;
		color: #111;
		font-weight: bold;
		border: none;
		padding: 12px 24px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1.1rem;
	}
	.btn-save:disabled {
		opacity: 0.6;
	}
	.status-msg {
		margin-top: 12px;
		font-weight: bold;
	}
	.text-white {
		color: #fff;
	}
</style>
