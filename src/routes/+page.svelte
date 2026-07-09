<div class="home-container main-container">
	<a href="/about" class="info-floating-btn" aria-label="Про гру">
		<span>i</span>
	</a>

	<div class="title-wrapper">
		<h1 class="mafia-title">MAFIA</h1>
	</div>

	<div class="menu-box">
		<a href="/play" class="menu_btn play-btn">Грати</a>
		<a href="/settings" class="menu_btn secondary-btn">Налаштування</a>
		<a href="/rules" class="menu_btn secondary-btn">Правила гри</a>
	</div>

	<footer class="credits">
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

	.info-floating-btn {
		position: absolute;
		top: 25px;
		left: 25px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 68, 68, 0.3);
		background: transparent;
		z-index: 100;
		transition: background-color 0.2s ease, border-color 0.2s ease;
	}

	.info-floating-btn span {
		font-size: 16px;
		color: #ff4444;
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
		gap: 14px;
		width: 100%;
		max-width: 280px;
	}

	.home-container .menu_btn {
		width: 100%;
		text-align: center;
		box-sizing: border-box;
		text-decoration: none;
		font-size: 18px;
		padding: 16px;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s;
	}

	.home-container .play-btn {
		background-color: #ff4444;
		color: #fff;
		border: 1px solid #ff4444;
		font-size: 22px;
		font-weight: 600;
		box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
	}

	.home-container .secondary-btn {
		background-color: transparent;
		color: rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(255, 68, 68, 0.4);
	}

	.home-container .menu_btn:active {
		filter: brightness(0.8);
		transform: scale(0.97);
	}

	.info-floating-btn:active {
		background: rgba(255, 68, 68, 0.1);
		transform: scale(0.97);
	}

	.credits {
		position: absolute;
		bottom: 25px;
		left: 0;
		width: 100%;
		text-align: center;
	}

	.madeBy {
		color: rgba(255, 255, 255, 0.3);
		font-size: 13px;
		letter-spacing: 1px;
		text-decoration: none;
		transition: color 0.3s ease;
	}

	@media (hover: hover) {
		.home-container .play-btn:hover {
			background-color: #ff5555;
			border-color: #ff5555;
			box-shadow: 0 6px 20px rgba(255, 68, 68, 0.5);
		}

		.home-container .secondary-btn:hover {
			background-color: rgba(255, 68, 68, 0.1);
			color: #fff;
			border-color: #ff4444;
		}

		.info-floating-btn:hover {
			border-color: #ff4444;
			background: rgba(255, 68, 68, 0.05);
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
	}

	@media (max-width: 420px) {
		.home-container {
			gap: 30px;
		}

		.mafia-title {
			font-size: 52px;
		}

		.home-container .menu_btn {
			font-size: 17px;
			padding: 14px 18px;
		}
	}
</style>
