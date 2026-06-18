<script>
	export let label = '';
	export let id = '';
	export let error = '';
	export let maxlength = '';
	export let value = '';
	export let isTextarea = false;
	export let placeholder = '';
</script>

<div class="form-group">
	{#if label}
		<label class="text-gray" for={id}>{label}</label>
	{/if}

	{#if isTextarea}
		<textarea
			{id}
			rows="3"
			{maxlength}
			spellcheck="false"
			autocomplete="off"
			{placeholder}
			class:input-error={error}
			bind:value
		/>
	{:else}
		<input
			type="text"
			{id}
			{placeholder}
			class:input-error={error}
			bind:value
			{maxlength}
		/>
	{/if}

	{#if error}
		<span class="error-text">{error}</span>
	{/if}
	
	{#if maxlength}
		<span class="char-counter">{value.length}/{maxlength}</span>
	{/if}
</div>

<style>
	.text-gray {
		color: #a1a1aa !important;
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
	textarea {
		min-height: 37px;
		overflow-y: auto;
		display: block;
		resize: vertical;
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
	.error-text {
		color: #ef4444;
		font-size: 0.75rem;
		margin-top: 2px;
		font-weight: 600;
	}
	:global(.input-error) {
		border-color: #ef4444 !important;
		background: rgba(239, 68, 68, 0.03) !important;
	}
</style>
