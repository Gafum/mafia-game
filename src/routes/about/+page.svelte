<script>
	import { BookOpen, Settings, UserCheck, Palette, Mail, Users, HatGlasses } from 'lucide-svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import { goto } from '$app/navigation';
	import { createArray } from '$lib/functions/createArray';
	import { cardRules } from '$lib/stores';
</script>

<div class="about-container">
	<header class="about-header">
		<h1>Про проєкт</h1>
	</header>

	<!-- Ідея та Суть гри -->
	<section class="section intro-panel">
		<h2>Ідея</h2>
		<p class="text-main">
			Цей проєкт — це адаптивний веб-сайт для класичної гри
			<a
				class="highlight-text"
				href="https://uk.wikipedia.org/wiki/%D0%9C%D0%B0%D1%84%D1%96%D1%8F_(%D0%B3%D1%80%D0%B0)"
				target="_blank"
			>
				Мафія
			</a>
			. Метою розробки була повна адаптація ігрового процесу під екрани смартфонів, дозволяючи компанії
			друзів грати в будь-якому місці та в будь-який час. Вам більше не потрібна фізична колода карт
			чи паперові блокноти для ведучого ви можете просто налаштувати гру під свою компанію і запустити
			її прямо тут.
		</p>

		<div class="atmosphere-box">
			<div class="atmosphere-icon mobile-hidden-icon">
				<HatGlasses size={24} color="#ff4444" />
			</div>
			<div class="atmosphere-content">
				<h3>Про процес гри</h3>
				<p>
					Додаток зберігає певні аспекти реальної Мафії, тому під час нічних фаз гравці повинні
					чесно заплющити очі, а телефон передавати по колу, щоб кожен таємно отримав свою роль з
					одного екрану.
				</p>
				<p style="margin-top: 8px;">
					Щоб зробити партії максимально цікавими, додаток дозволяє завантажити реальні фото прямо
					на карти! За замовчуванням у проєкті розробник використав фотографії власної компанії для
					локальних мемів, але ви можете повністю переробити колоду під своїх друзів, додавши власні
					жарти, свої приколи та унікальні ідеї.
				</p>
			</div>
		</div>
	</section>

	<!-- Детальний огляд сторінок -->
	<section class="section flow-panel">
		<h2>Детальний огляд сторінок</h2>

		<div class="flow-steps">
			<!-- 1. Play Screen -->
			<a class="step-card" href="/play">
				<div class="step-icon-wrapper">
					<BookOpen size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>Гра (Play Screen)</h3>
					<p>
						Основна сторінка, яка використовується перед початком гри. Тут гравці по черзі
						відкривають свої картки, де можуть дізнатися про свою роль під час самої гри. Для
						кожного персонажа відображається назва ролі, опис та зображення. Також можна швидко
						ознайомитися із задачею ролі, натиснувши на інформаційну кнопку зверху справа на карті.
					</p>
				</div>
			</a>

			<!-- 2. Settings -->
			<a class="step-card" href="settings">
				<div class="step-icon-wrapper">
					<Settings size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>Налаштування (Settings)</h3>
					<p>
						Сторінка для зміни кількості гравців. Тут можна вказати число мирних жителів і мафії, а
						також увімкнути або вимкнути додаткові ролі, такі як Шериф, Лікар чи інші. Усі
						конфігурації автоматично зберігаються та використовуються під час створення нової
						партії.
					</p>
				</div>
			</a>

			<!-- 3. Games Rules and Roles -->
			<a class="step-card" href="roles">
				<div class="step-icon-wrapper">
					<Users size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>Правила гри та Персонажі (Rules)</h3>
					<p>
						На цій сторінці ви можете прочитати правила Мафії та переглянути ролі, які можна
						використати під час гри. Натиснувши на картку героя, на задній стороні ви побачите опис
						його здібностей та його задачі. Наступний натиск переверне карту і змінить фото героя,
						де ви зможете переглянути різні форми однієї і тої самої ралі. Спочатку в списку
						знаходяться стандартні карти, а вже далі ті, які ви створите самотужки. Для зручності ви
						можете знайти потрібну картку за допомогою пошуку, а також показати команди окремо,
						увімкнувши додаткові фільтри.
					</p>
				</div>
			</a>

			<!-- 4. Host Dashboard -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="step-card"
				on:click={() =>
					goto('/host', {
						state: {
							peopleList: createArray($cardRules)
						}
					})}
			>
				<div class="step-icon-wrapper">
					<UserCheck size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>Панель ведучого (Host Dashboard)</h3>
					<p>
						Панель ведучого містить усі інструменти, необхідні для керування грою. Тут можна швидко
						переглянути правила Мафії, вести нотатки про перебіг партії та користуватися підказками
						та підсвіткою для зручнішої роботи під час гри. <br /><br />

						На сторінці відображається список усіх персонажів поточної партії. Ведучий може
						переглядати інформацію про них, змінювати порядок карток, редагувати склад гри та
						позначати вибулих гравців. Також панель автоматично формує підказки для нічної фази,
						показуючи, кого і в якій послідовності потрібно будити. <br /><br />

						Для експериментальних або жартівливих партій доступний режим махлювання, який можна
						увімкнути у відділи "Правила гри". Він дозволяє вручну змінювати розподіл ролей,
						додавати або прибирати окремі картки та формувати власний набір персонажів перед
						початком гри. Завдяки цьому можна створювати нестандартні сценарії та неочікувані
						сюжетні повороти, які зроблять кожну партію унікальною.
					</p>
				</div>
			</div>

			<!-- 5. Custom Cards -->
			<a class="step-card" href="custom-cards">
				<div class="step-icon-wrapper">
					<Palette size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>Користувацькі картки (Custom Cards)</h3>
					<p>
						Розділ для створення власних карт. Якщо стандартних персонажів вам замало, у цьому
						розділі можна створити повністю нові картки. Ви можете ввести будь-яку назву ролі,
						написати для неї смішний чи канонічний опис, вибрати базову команду та завантажити
						зображення з галереї вашого пристрою. Всі створенні карти можна зручно переглядати,
						редагувати або видаляти в загальному списку. Створені картки зберігаються локально та
						можуть використовуватися разом зі стандартними ролями.
					</p>
				</div>
			</a>
		</div>
	</section>

	<!-- Open Source -->
	<section class="section open-source-panel">
		<h2>Відкритий вихідний код</h2>

		<p class="text-main">
			Цей проєкт є абсолютно безкоштовним та некомерційним програмним забезпеченням із відкритим
			вихідним кодом і доступний на GitHub. Ви можете переглянути реалізацію, запустити застосунок
			локально, змінити наявні функції або використати код як основу для власної версії гри.
		</p>

		<p class="author-label">Автор розробки: Дмитро Марчук</p>
		<p class="author-help-label">Допомагали: Гліб Шумафов, Влад Коханевич</p>

		<div class="social-links-grid">
			<!-- 2. YouTube Link -->
			<SimpleLink href="https://www.youtube.com/@gafum" type="red" props={{ target: '_blank' }}>
				<svg class="icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
					<path
						d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
					/>
				</svg> <span class="link-text-span link-text-span-max-width_mobile">YouTube</span>
			</SimpleLink>

			<!-- 1. GitHub Link -->
			<SimpleLink
				href="https://github.com/Gafum/mafia-game"
				type="transparent"
				props={{ target: '_blank' }}
			>
				<svg class="icon-svg" viewBox="0 0 24 24" width="22" height="22" fill="white">
					<path
						d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
					/>
				</svg> <span class="link-text-span link-text-span-max-width_mobile">Репозиторій</span>
			</SimpleLink>

			<!-- 3. Email Link -->
			<SimpleLink href="mailto:marcukdyma@gmail.com" type="green" props={{ target: '_blank' }}>
				<Mail size={20} />
				<span class="link-text-span link-text-span-max-width_mobile">Написати</span>
			</SimpleLink>
		</div>
	</section>

	<StandardLinks />
</div>

<style>
	.about-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 24px 16px 60px;
	}

	.about-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.about-header h1 {
		font-size: 2.2rem;
		font-weight: 800;
		margin: 0;
		color: #ffffff !important;
		letter-spacing: -0.5px;
	}

	.section {
		background: #141416 !important;
		border: 1px solid #27272a !important;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
	}

	.section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 0;
		margin-bottom: 16px;
		color: #ff4444 !important;
		border-bottom: 1px solid #27272a;
		padding-bottom: 8px;
	}

	.text-main,
	p {
		color: #e4e4e7 !important;
		line-height: 1.6;
		font-size: 1rem;
		margin: 0 0 12px;
	}

	.highlight-text {
		color: #ff4444 !important;
		font-weight: 600;
	}

	.highlight-text:hover {
		text-decoration: underline;
	}

	.atmosphere-box {
		background: rgba(255, 68, 68, 0.04) !important;
		border-left: 4px solid #ff4444 !important;
		border-radius: 8px;
		padding: 18px;
		display: flex;
		gap: 14px;
		align-items: flex-start;
		margin-top: 20px;
	}

	.atmosphere-icon {
		flex-shrink: 0;
		margin-top: 20px;
	}

	.atmosphere-content h3 {
		margin: 0 0 6px 0;
		font-size: 1.1rem;
		font-weight: 700;
		color: #ffffff !important;
	}

	.atmosphere-content p {
		margin: 0;
		font-size: 0.95rem;
		color: #d4d4d8 !important;
	}

	.flow-steps {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.step-card {
		display: flex;
		gap: 16px;
		align-items: flex-start;
		background: #1c1c1f !important;
		border: 1px solid #27272a !important;
		border-radius: 10px;
		padding: 18px;
		transition: border-color 0.2s ease, transform 0.2s ease;
	}

	.step-card:hover {
		border-color: rgba(255, 68, 68, 0.4) !important;
	}

	.step-icon-wrapper {
		background: rgba(255, 68, 68, 0.08) !important;
		padding: 10px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.step-content h3 {
		margin: 0 0 6px 0;
		font-size: 1.15rem;
		font-weight: 700;
		color: #ffffff !important;
		text-align: justify;
	}

	.step-content p,
	.step-content p br {
		text-align: justify;
		margin: 0;
		font-size: 0.95rem;
		color: #a1a1aa !important;
		line-height: 1.5;
	}

	.author-label {
		font-size: 18px;
		margin: 16px 0 0;
	}

	.author-help-label {
		font-size: 16px;
		margin: 5px 0 0;
	}

	.social-links-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		margin: 15px 0 0;
		align-items: center;
	}

	:global(.social-links-grid .link-style) {
		height: 45px;
		margin: 0 !important;
	}

	:global(.social-links-grid .link-style.transparent) {
		height: 49px;
	}

	@media (max-width: 730px) {
		.social-links-grid {
			grid-template-columns: 1fr;
			gap: 10px;
		}

		.step-card {
			flex-direction: column;
			gap: 12px;
		}

		.about-header h1 {
			font-size: 1.8rem;
		}
	}
</style>
