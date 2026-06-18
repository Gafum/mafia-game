<!-- src/routes/about/+page.svelte -->
<script>
	import { BookOpen, Settings, UserCheck, Palette, Mail, Users } from 'lucide-svelte';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
</script>

<div class="about-container">
	<header class="about-header animate-fade">
		<h1>Про проєкт</h1>
	</header>

	<!-- Ідея та Суть гри -->
	<section class="section intro-panel animate-fade">
		<h2>Ідея та призначення</h2>
		<p class="text-main">
			Цей проєкт — це сучасна мобільна веб-аплікація для класичної психологічної гри
			<span class="highlight-text">Мафія</span>. Головна мета розробки — повністю адаптувати ігровий
			процес під екрани смартфонів, дозволяючи компанії друзів грати в будь-якому місці та в
			будь-який час. Вам більше не потрібна фізична колода карт чи паперові блокноти для ведучого.
		</p>

		<div class="atmosphere-box">
			<div class="atmosphere-icon">
				<Users size={24} color="#ff4444" />
			</div>
			<div class="atmosphere-content">
				<h3>Атмосфера та фан живої гри</h3>
				<p>
					Додаток зберігає всю магію реальної Мафії: під час нічних фаз гравці чесно заплющують очі,
					а телефон передається по колу, щоб кожен таємно отримав свою роль з одного екрану.
				</p>
				<p style="margin-top: 8px;">
					Щоб зробити партії максимально угарними, додаток підтримує завантаження реальних
					фотографій ваших друзів прямо на карти! За замовчуванням у проєкті розробник використав
					фотографії власної компанії для локальних мемів, але ви можете повністю переробити колоду
					під своїх друзів, додавши власні жарти, локальні приколи та унікальні зображення.
				</p>
			</div>
		</div>
	</section>

	<!-- Детальний Огляд Усіх Сцен По Черзі -->
	<section class="section flow-panel animate-fade">
		<h2>Детальний огляд ігрових екранів</h2>

		<div class="flow-steps">
			<!-- 1. Play Screen -->
			<div class="step-card">
				<div class="step-icon-wrapper">
					<BookOpen size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>1. Екран гри (Play Screen)</h3>
					<p>
						Головна сцена для старту партії. Карти ролей відображаються у вигляді красивої
						інтерактивної колоди, яку гравці по черзі перегортають. Кожна картка містить ім'я,
						аватар (фото вашого друга) та індивідуальну фірмову цитату або опис.
					</p>
				</div>
			</div>

			<!-- 2. Settings -->
			<div class="step-card">
				<div class="step-icon-wrapper">
					<Settings size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>2. Налаштування (Settings)</h3>
					<p>
						Екран для гнучкої підготовки до гри під будь-яку кількість людей. Тут ви можете за
						секунду виставити точну кількість мирних жителів та мафіозі, а також за допомогою
						зручних тумблерів (перемикачів) додати в гру активні спеціальні ролі: Шерифа, Лікаря,
						Камікадзе, Маньяка, Охоронця, Адвоката, Агента чи Дурачка. Усі конфігурації автоматично
						зберігаються в пам'ять браузера.
					</p>
				</div>
			</div>

			<!-- 3. Host Dashboard -->
			<div class="step-card">
				<div class="step-icon-wrapper">
					<UserCheck size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>3. Панель ведучого (Host Dashboard)</h3>
					<p>
						Повноцінне робоче місце для ведучого (хоста) гри. Екран дозволяє бачити повний список
						ролей, миттєво в один клік перемикати статус гравців (живий/вбитий) та вести текстові
						нотатки поточного дня. Також панель автоматично генерує динамічний текстовий скрипт
						черговості ходів на ніч, підказуючи ведучому, кого саме і в якому порядку потрібно
						"будити".
					</p>
				</div>
			</div>

			<!-- 4. Custom Cards -->
			<div class="step-card">
				<div class="step-icon-wrapper">
					<Palette size={20} color="#ff4444" />
				</div>
				<div class="step-content">
					<h3>4. Конструктор карток (Custom Cards)</h3>
					<p>
						Ваша власна творча майстерня ролей. Якщо стандартних персонажів вам замало, у цьому
						розділі можна створити повністю кастомні картки. Ви можете ввести будь-яку назву ролі,
						написати для неї смішний чи канонічний опис, вибрати базову команду та завантажити
						будь-яке зображення або фотку друга з галереї вашого пристрою. Всі створенні карти можна
						зручно переглядати, редагувати або видаляти в загальному списку.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Open Source & Social Links (Strict Order) -->
	<section class="section open-source-panel animate-fade">
		<h2>Відкритий вихідний код та розробка</h2>
		<p class="text-main">
			Цей проєкт є абсолютно безкоштовним та некомерційним програмним забезпеченням із відкритим
			вихідним кодом. Якщо ви розробник або хочете щось змінити — ви можете вільно завантажити
			(склонувати) цей проєкт із GitHub, додати туди власні фічі, повністю переробити інтерфейс,
			змінити правила гри або оптимізувати логіку під себе.
		</p>
		<p class="author-label">Автор проєкту: Dmytro Marchuk</p>

		<div class="social-links-grid">
			<!-- 1. GitHub Link -->
			<a
				href="https://github.com/Gafum/mafia-game"
				target="_blank"
				rel="noopener noreferrer"
				class="social-btn github-btn"
			>
				<svg class="icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
					<path
						d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
					/>
				</svg>
				<span>Репозиторій</span>
			</a>

			<!-- 2. YouTube Link -->
			<a
				href="https://youtube.com"
				target="_blank"
				rel="noopener noreferrer"
				class="social-btn youtube-btn"
			>
				<svg class="icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="white">
					<path
						d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
					/>
				</svg>
				<span>YouTube</span>
			</a>

			<!-- 3. Email Link -->
			<a href="mailto:dmytro.marchuk.dev@gmail.com" class="social-btn email-btn">
				<Mail size={20} class="icon-svg" />
				<span>Написати</span>
			</a>
		</div>
	</section>

	<StandardLinks />
</div>

<style>
	/* Глобальні примусові налаштування кольорів для контенту сторінки */
	.about-container {
		max-width: 800px;
		margin: 0 auto;
		padding: 24px 16px 60px;
		box-sizing: border-box;
	}

	.about-header {
		text-align: center;
		margin-bottom: 30px;
		border-bottom: 1px solid rgba(255, 68, 68, 0.2);
		padding-bottom: 20px;
	}

	/* Примусовий білий колір для заголовка */
	.about-header h1 {
		font-size: 2.2rem;
		font-weight: 800;
		margin: 0;
		color: #ffffff !important;
		letter-spacing: -0.5px;
	}

	/* Контейнери секцій із жорстким фоном та рамкою */
	.section {
		background: #141416 !important;
		border: 1px solid #27272a !important;
		border-radius: 12px;
		padding: 24px;
		margin-bottom: 24px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
	}

	/* Заголовки секцій */
	.section h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 0;
		margin-bottom: 16px;
		color: #ff4444 !important;
		border-bottom: 1px solid #27272a;
		padding-bottom: 8px;
	}

	/* Весь звичайний текст сторінки — світло-сірий, читабельний на темному фоні */
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

	.white-text {
		color: #ffffff !important;
	}

	/* Атмосферний блок (Особливість з реальними фото) */
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

	/* Сітка карток ігрових сцен */
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
		transform: translateX(2px);
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
	}

	.step-content p {
		margin: 0;
		font-size: 0.95rem;
		color: #a1a1aa !important;
		line-height: 1.5;
	}

	.author-label {
		font-size: 1.2rem;
		color: #cacaca !important;
		margin-top: 16px;
	}

	/* Кнопки соцмереж */
	.social-links-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		margin-top: 20px;
	}

	.social-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 12px 10px;
		border-radius: 8px;
		font-weight: 600;
		text-decoration: none;
		font-size: 0.9rem;
		transition: all 0.2s ease;
		box-sizing: border-box;
	}

	.social-btn span {
		color: white;
	}

	.icon-svg {
		flex-shrink: 0;
	}

	/* Примусові стилі для кожної кнопки окремо, щоб текст лишався білим */
	.github-btn {
		background: #24292e !important;
		color: #ffffff !important;
		border: 1px solid #3f3f46 !important;
	}

	.github-btn:hover {
		background: #2f363d !important;
		border-color: #a1a1aa !important;
	}

	.youtube-btn {
		background: #cc181e !important;
		color: #ffffff !important;
		border: 1px solid #cc181e !important;
	}

	.youtube-btn:hover {
		background: #e52d27 !important;
	}

	.email-btn {
		background: #2563eb !important;
		color: #ffffff !important;
		border: 1px solid #2563eb !important;
	}

	.email-btn:hover {
		background: #3b82f6 !important;
	}

	/* Анімація появи сторінки */
	.animate-fade {
		animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Адаптивність під невеликі мобільні екрани */
	@media (max-width: 680px) {
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
