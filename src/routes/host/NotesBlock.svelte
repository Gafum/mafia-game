<script>
	let text = '';
	let scrollTop = 0;

	const keywords = {
		red: ['мафія', 'дон', 'кілер', 'маф', 'мафію', 'поганці', 'вбивці'],
		blue: ['мирний', 'шериф', 'лікар', 'комісар', 'мир', 'мирного', 'місто', 'жителя', 'доброго']
	};

	function handleScroll(event) {
		scrollTop = event.target.scrollTop;
	}

	$: highlightedHTML = text
		.split(/(\s+)/)
		.map((word) => {
			if (!word) return '';

			if (word.includes('\n')) {
				return word.replace(/\n/g, '<br>');
			}

			const cleanWord = word.toLowerCase().trim().replace(/[.,!]/g, '');

			if (keywords.red.includes(cleanWord)) {
				return `<span style="color: #ff4d4d;">${word}</span>`;
			}
			if (keywords.blue.includes(cleanWord)) {
				return `<span style="color: #4d94ff;">${word}</span>`;
			}

			return word;
		})
		.join('');
</script>

<div class="notes-container">
	<div class="editor-wrapper">
		<div class="backdrop" style="top: {12 - scrollTop}px">
			{@html highlightedHTML}
		</div>

		<textarea
			bind:value={text}
			on:scroll={handleScroll}
			placeholder="Тут можна писати нотатки... (мафія, шериф і т.д. підсвічуються)"
			spellcheck="false"
		/>
	</div>
</div>

<style>
	.notes-container {
		width: 100%;
		background: #1b1b1b;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.5);
	}

	.editor-wrapper {
		position: relative;
		height: 200px;
		padding: 12px;
		overflow: hidden;
	}

	textarea,
	.backdrop,
	:global(.backdrop span),
	:global(.backdrop br) {
		width: 100%;
		height: 100%;
		min-height: 150px;
		font-family: inherit;
		font-size: 16px;
		line-height: 1.5;
		margin: 0;
		padding: 0;
		border: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		background: transparent;
	}

	textarea {
		position: relative;
		z-index: 2;
		color: transparent;
		caret-color: white;
		outline: none;
		resize: none;
		overflow-y: auto;
		display: block;
	}

	.backdrop {
		position: absolute;
		left: 12px;
		width: calc(100% - 24px);
		z-index: 1;
		color: #ccc;
		pointer-events: none;
		height: auto;
		min-height: 100%;
	}

	textarea::placeholder {
		color: #666;
	}

	:global(.red-notes-text) {
		color: #ff4d4d;
	}

	:global(.blue-notes-text) {
		color: #4d94ff;
	}
</style>
