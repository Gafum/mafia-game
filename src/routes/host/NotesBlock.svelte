<script>
	import { bigDescriptions } from '$lib/stores';
	import { TEAMS } from '$lib/data/teams.js';

	export let text = '';
	let scrollTop = 0;
	let textareaElement;
	let currentSuggestion = '';
	let remainingPart = '';

	const keywords = {
		peaceful: [
			'мирний',
			'мир',
			'мирного',
			'мирні',
			'шериф',
			'шерифа',
			'шерифу',
			'лікар',
			'лікаря',
			'лікарю',
			'комісар',
			'місто',
			'житель',
			'жителя',
			'доброго',
			'добро',
			'містяни',
			'житель',
			'охоронець',
			'охоронця',
			'захист',
			'тіпчік',
			'тіпочок',
			'тіпочка',
			'тіпочку',
			'дурачок',
			'дурачка',
			'дурачку',
			'дурень',
			'ідіот',
			'сніговик',
			'сніговика',
			'сніговику',
			'сніжинка',
			'напарник',
			'напарнику',
			'напарника',
			...Object.values($bigDescriptions)
				.filter((elemnent) => elemnent.team === TEAMS[0].value && elemnent.name)
				.map(({ name }) => name.toString().toLowerCase())
		],
		mafia: [
			'мафія',
			'маф',
			'мафію',
			'мафії',
			'мафіозі',
			'дон',
			'кілер',
			'кіллер',
			'поганці',
			'вбивці',
			'злодії',
			'злочинці',
			'агент',
			'агента',
			'агенти',
			'ніндзя',
			'ніндзю',
			'нишпорка',
			'нишпорку',
			'нишпоркою',
			...Object.values($bigDescriptions)
				.filter((elemnent) => elemnent.team === TEAMS[1].value && elemnent.name)
				.map(({ name }) => name.toString().toLowerCase())
		],
		neutral: [
			'маньяк',
			'маніяк',
			'маніяка',
			'камікадзе',
			'бомба',
			'адвокат',
			'адвоката',
			'лідер',
			'лідеру',
			'лідера',
			'пастор',
			'пастору',
			'пастора',
			'крадій',
			'крадію',
			'крадія',
			...Object.values($bigDescriptions)
				.filter((elemnent) => elemnent.team === TEAMS[2].value && elemnent.name)
				.map(({ name }) => name.toString().toLowerCase())
		],
		custom: Object.values($bigDescriptions)
			.filter((elemnent) => elemnent.team === TEAMS[3].value && elemnent.name)
			.map(({ name }) => name.toString().toLowerCase())
	};

	const allKeywords = Object.values(keywords).reduce(
		(prevKeywords, curKeywords) => prevKeywords.concat(curKeywords),
		[]
	);

	function handleScroll(event) {
		scrollTop = event.target.scrollTop;
	}

	$: lastWord = text.split(/[\s,.!]+/).pop() || '';

	$: {
		if (lastWord.length >= 2) {
			const match = allKeywords.find(
				(w) =>
					w.toLowerCase().startsWith(lastWord.toLowerCase()) &&
					w.toLowerCase() !== lastWord.toLowerCase()
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

		text = text.toString() + remainingPart + ' ';

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

			const isLast = index === arr.length - 1;

			const match = word.match(/^([^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]*)(.*?)([^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]*)$/);

			if (!match) return word;

			const prefix = match[1];
			const coreWord = match[2];
			const suffix = match[3];

			const cleanWord = coreWord.toLowerCase();
			let color = '';

			if (cleanWord) {
				for (const teamName in keywords) {
					if (!Object.hasOwn(keywords, teamName)) continue;

					const oneTeamWords = keywords[teamName];
					if (oneTeamWords.includes(cleanWord)) {
						color = teamName;
					}
				}
			}

			const wrappedCore = color
				? `<span class="${color}-color-notes-text">${coreWord}</span>`
				: coreWord;
			const baseSpan = `${prefix}${wrappedCore}${suffix}`;

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
		background: #111113;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid #232326;
		box-sizing: border-box;
		transition: border-color 0.2s;
	}

	.notes-container:focus-within {
		border-color: #ff4444;
	}

	.editor-wrapper {
		position: relative;
		height: min-content;
		padding: 10px;
		overflow: hidden;
		background: #161619;
	}

	textarea,
	.backdrop,
	:global(.backdrop span),
	:global(.backdrop br) {
		width: 100%;
		height: 100%;
		min-height: 160px;
		font-family: inherit;
		font-size: 0.85rem;
		line-height: 1.5;
		margin: 0;
		padding: 0;
		border: none;
		white-space: pre-wrap;
		word-wrap: break-word;
		background: transparent;
		box-sizing: border-box;
	}

	textarea {
		position: relative;
		z-index: 2;
		color: transparent !important;
		caret-color: white;
		outline: none;
		overflow-y: auto;
		display: block;
		resize: vertical;
	}

	.backdrop {
		position: absolute;
		left: 10px;
		top: 10px;
		width: calc(100% - 20px);
		z-index: 1;
		color: #a1a1aa;
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
		left: 10px;
		top: 10px;
		width: calc(100% - 20px);
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
		color: #52525b;
	}

	:global(.peaceful-color-notes-text) {
		color: #4d94ff;
	}

	:global(.mafia-color-notes-text) {
		color: #ff4d4d;
	}

	:global(.neutral-color-notes-text) {
		color: #b469ff;
	}

	:global(.custom-color-notes-text) {
		color: #2ecc71;
	}
</style>
