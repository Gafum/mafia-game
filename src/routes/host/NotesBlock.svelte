<script>
	let text = '';
	let scrollTop = 0;
	let textareaElement;
	let currentSuggestion = '';
	let remainingPart = '';

	const keywords = {
		red: [
			'мафія',
			'дон',
			'кілер',
			'маф',
			'мафію',
			'поганці',
			'вбивці',
			'мафії',
			'злодії',
			'кіллер',
			'злочинці',
			'мафіозі',
			'агент',
			'агента',
			'агенти'
		],
		blue: [
			'мирний',
			'шериф',
			'лікар',
			'комісар',
			'мир',
			'мирного',
			'місто',
			'жителя',
			'доброго',
			'мирні',
			'добро',
			'містяни',
			'житель',
			'охоронець',
			'охоронця',
			'захист',
			'тіпчік',
			'тіпочок',
			'тіпочка',
			'тіпочку'
		],
		green: [
			'маньяк',
			'маніяк',
			'маніяка',
			'камікадзе',
			'бомба',
			'адвокат',
			'адвоката',
			'дурачок',
			'дурень',
			'ідіот'
		]
	};

	const allKeywords = [...keywords.red, ...keywords.blue, ...keywords.green];

	function handleScroll(event) {
		scrollTop = event.target.scrollTop;
	}

	$: lastWord = text.split(/[\s,.!]+/).pop() || '';

	$: {
		if (lastWord.length >= 2) {
			const match = allKeywords.find(
				(w) => w.startsWith(lastWord.toLowerCase()) && w !== lastWord.toLowerCase()
			);
			if (match) {
				currentSuggestion = match;
				remainingPart = match.substring(lastWord.length);
			} else {
				currentSuggestion = '';
				remainingPart = '';
			}
		} else {
			currentSuggestion = '';
			remainingPart = '';
		}
	}

	function autocompleteWord() {
		if (!currentSuggestion) return;

		const words = text.split(/(\s+)/);
		words[words.length - 1] = currentSuggestion + ' ';
		text = words.join('');

		setTimeout(() => {
			textareaElement.focus();
			textareaElement.selectionStart = textareaElement.selectionEnd = text.length;
		}, 0);
	}

	function handleKeyDown(event) {
		if (event.key === 'Tab' && currentSuggestion) {
			event.preventDefault();
			autocompleteWord();
		}
	}

	$: highlightedHTML = text
		.split(/(\s+)/)
		.map((word, index, arr) => {
			if (!word) return '';

			if (word.includes('\n')) {
				return word.replace(/\n/g, '<br>');
			}

			const cleanWord = word.toLowerCase().trim().replace(/[.,!]/g, '');
			const isLast = index === arr.length - 1;

			let color = '';

			for (const teamName in keywords) {
				if (!Object.hasOwn(keywords, teamName)) continue;

				const oneTeamWords = keywords[teamName];
				if (oneTeamWords.includes(cleanWord)) {
					color = teamName;
				}
			}

			const baseSpan = color ? `<span class="${color}-notes-text">${word}</span>` : word;

			if (isLast && remainingPart) {
				return `${baseSpan}<span class="phantom-text">${remainingPart}</span>`;
			}

			return baseSpan;
		})
		.join('');
</script>

<div class="notes-container">
	<div class="editor-wrapper">
		<div class="backdrop" style="top: {12 - scrollTop}px">
			{@html highlightedHTML}
		</div>

		<textarea
			bind:this={textareaElement}
			bind:value={text}
			on:scroll={handleScroll}
			on:keydown={handleKeyDown}
			placeholder="Нотатки ведучого... (мафія, шериф, маніяк підсвічуються)"
			spellcheck="false"
			autocomplete="off"
		/>

		{#if remainingPart}
			<button
				class="mobile-tap-zone"
				on:touchstart|preventDefault={autocompleteWord}
				on:mousedown|preventDefault={autocompleteWord}
				style="top: {12 - scrollTop}px"
			>
				Дописати
			</button>
		{/if}
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
		height: min-content;
		padding: 12px;
		overflow: hidden;
	}

	textarea,
	.backdrop,
	:global(.backdrop span),
	:global(.backdrop br) {
		width: 100%;
		height: 100%;
		min-height: 160px;
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
		overflow-y: auto;
		display: block;
		resize: vertical;
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

	:global(.phantom-text) {
		color: #ffffff !important;
		opacity: 0.25;
		font-style: italic;
		letter-spacing: 0.5px;
		animation: pulse-ghost 1.5s infinite ease-in-out;
	}

	@keyframes pulse-ghost {
		0% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.35;
		}
		100% {
			opacity: 0.2;
		}
	}

	.mobile-tap-zone {
		position: absolute;
		left: 12px;
		width: calc(100% - 24px);
		height: 100%;
		min-height: 160px;
		z-index: 3;
		background: transparent;
		border: none;
		color: transparent;
		cursor: pointer;
		text-indent: -9999px;
	}

	textarea::placeholder {
		color: #555;
	}

	:global(.red-notes-text) {
		color: #ff4d4d;
	}

	:global(.blue-notes-text) {
		color: #4d94ff;
	}

	:global(.green-notes-text) {
		color: #2ecc71;
	}
</style>
