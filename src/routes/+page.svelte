<div class="home-conteiner main-conteiner">
	<a href="/about" class="info-floating-btn" aria-label="Про гру">
		<span> i </span>
	</a>

	<h1>Mafia</h1>
	<a href="/play" class="menu_btn play-btn">Грати</a>
	<a href="/settings" class="menu_btn settings">Налаштування</a>
	<a href="/rules" class="menu_btn rules-btn">Правила гри</a>

	<a href="https://github.com/Gafum" target="_blank" class="madeBy">Dmytro Marchuk</a>
</div>

<style>
	.info-floating-btn {
		position: fixed;
		top: 20px;
		left: 20px;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		border: #721f1f 2px solid;
		z-index: 100;
	}

	.info-floating-btn span {
		font-size: 20px;
		text-align: center;
		color: white;
		transform: translateY(-1px);
	}

	.home-conteiner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		min-height: 100vh;
		min-height: 100svh;
		min-height: 100dvh;
		height: 100%;
		width: 100%;
		gap: 20px;
		background-color: #111;
	}

	.home-conteiner > h1 {
		color: #912c2c;
		font-size: 80px;
		font-weight: bold;
		transition: text-shadow 0.2s;
	}

	.home-conteiner > a.menu_btn {
		padding: 10px 20px;
		border-radius: 10px;
		color: rgb(235, 235, 235);
		transition-property: filter, box-shadow, transform;
		transition-duration: 0.2s;
	}

	.home-conteiner > a.menu_btn.settings {
		font-size: 30px;
		background-color: #493066;
	}

	.home-conteiner > a.menu_btn.play-btn {
		font-size: 70px;
		padding: 13px 35px;
		background-color: #2c9182;
	}

	.home-conteiner > a.menu_btn.rules-btn {
		font-size: 25px;
		background-color: #306740;
	}

	.madeBy {
		position: absolute;
		right: 10px;
		bottom: 10px;
		color: white;
		font-weight: 300;
		font-size: 14px;
	}

	@media (hover: hover) {
		.info-floating-btn:hover {
			background: #ff4444;
			border-color: #ff4444;
			box-shadow: 0 0 10px rgba(255, 68, 68, 0.6);
		}

		.home-conteiner > h1:hover {
			text-shadow: 0 0 7px rgb(185, 57, 57);
			filter: brightness(1.1);
		}
		a.settings:hover {
			filter: brightness(1.2);
			box-shadow: 0 0 10px #493066;
		}

		a.play-btn:hover {
			box-shadow: 0 0 12px #2c9182;
		}

		a.rules-btn:hover {
			box-shadow: 0 0 8px #306740;
		}
	}

	a:active {
		filter: brightness(0.85);
		transform: scale(0.96);
	}

	@media (hover: none) {
		a.settings:active {
			filter: brightness(1.2);
			box-shadow: 0 0 10px #493066;
		}

		a.play-btn:active {
			box-shadow: 0 0 12px #2c9182;
		}

		a.rules-btn:active {
			box-shadow: 0 0 8px #306740;
		}
	}

	@media (max-width: 480px) {
		.home-conteiner {
			gap: 15px;
		}
		.home-conteiner > h1 {
			font-size: 70px;
		}
		.home-conteiner > a.menu_btn.settings {
			font-size: 20px;
		}
		.home-conteiner > a.menu_btn.play-btn {
			font-size: 55px;
			padding: 8px 20px;
		}
		.home-conteiner > a.menu_btn.rules-btn {
			font-size: 20px;
		}

		.info-floating-btn {
			position: fixed;
			top: 15px;
			left: 15px;
			width: 32px;
			height: 32px;
		}

		.info-floating-btn span {
			font-size: 20px;
		}
	}
</style>
