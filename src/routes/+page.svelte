<script>
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
	import { Settings, BookOpen } from 'lucide-svelte';
</script>

<div class="home-container main-container">
	<div class="title-wrapper">
		<h1 class="mafia-title">MAFIA</h1>
	</div>

	<div class="menu-box">
		<SimpleLink
			href="/play"
			type="red"
			props={{ style: 'margin: 0; font-size: 40px; margin-bottom: 5px;' }}
		>
			Грати
		</SimpleLink>

		<SimpleLink href="/settings" type="transparent" props={{ style: 'margin: 0;' }}>
			<Settings size={18} color="#fff" style="stroke: #fff;" />
			Налаштування
		</SimpleLink>

		<SimpleLink href="/rules" type="transparent" props={{ style: 'margin: 0;' }}>
			<BookOpen size={18} color="#fff" style="stroke: #fff;" />
			Правила гри
		</SimpleLink>
	</div>

	<footer class="credits">
		<a href="/about" class="info-link">Про проєкт</a>
		<a href="https://github.com/Gafum" target="_blank" class="madeBy">Dmytro Marchuk</a>
	</footer>
</div>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
		gap: 42px;
		position: relative;
		overflow: hidden;
		padding: 20px;
		box-sizing: border-box;
	}

	.title-wrapper {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		cursor: default;
	}

	.mafia-title {
		color: #ff4444;
		font-size: 64px;
		font-weight: 700;
		letter-spacing: 8px;
		line-height: 1;
		margin: 0;
		text-transform: uppercase;
		text-shadow: 0 0 20px rgba(255, 68, 68, 0.2);
		transition: color 0.4s ease, text-shadow 0.4s ease;
	}

	.menu-box {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: 500px;
	}

	.credits {
		position: absolute;
		bottom: 25px;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.info-link {
		color: #ffffff66;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 1px;
		text-transform: uppercase;
		text-decoration: none;
		border: 1px solid #ffffff66;
		padding: 6px 16px;
		border-radius: 6px;
		background: rgba(22, 22, 25, 0.5);
		transition: all 0.2s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.madeBy {
		color: rgba(255, 255, 255, 0.3);
		font-size: 13px;
		letter-spacing: 1px;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.info-link:active {
		scale: 0.95;
		background: #1a1a1e;
		border-color: #ff4444;
		color: #fff;
		box-shadow: 0px 0px 8px rgba(255, 68, 68, 0.3);
	}

	@media (hover: hover) {
		.info-link:hover {
			color: #ffffff;
			border-color: #ff4444;
			background: #161619;
			box-shadow: 0px 0px 10px rgba(255, 68, 68, 0.2);
		}

		.madeBy:hover {
			color: #ff4444;
		}

		.title-wrapper:hover .mafia-title {
			color: #111;
			text-shadow: 0 0 30px #ff4444, 0 0 10px #ff4444;
		}

		.title-wrapper:hover ~ .credits .madeBy {
			color: rgba(255, 68, 68, 0.7);
		}

		.title-wrapper:hover ~ .credits .info-link {
			border-color: rgba(255, 68, 68, 0.3);
			color: #ff4444;
		}
	}

	@media (min-width: 780px) {
		.info-link {
			position: fixed;
			top: 20px;
			transform: translateX(-50%);
			left: 50%;
			margin: 0;
		}

		.title-wrapper:hover ~ .credits .info-link {
			border-color: #ffffff66;
			color: #ffffff66;
		}

		.home-container {
			position: relative;
		}
	}

	@media (max-width: 420px) {
		.home-container {
			gap: 30px;
		}

		.mafia-title {
			font-size: 48px;
			letter-spacing: 4px;
		}

		.menu-box {
			max-width: 100%;
			padding: 0 10px;
		}
	}

	@media (max-width: 290px) {
		.mafia-title {
			font-size: 36px;
			letter-spacing: 2px;
		}

		.info-link {
			font-size: 11px;
			padding: 4px 12px;
		}
	}
</style>
