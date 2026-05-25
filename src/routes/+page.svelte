<div class="home-conteiner main-conteiner">
	<h1>Mafia</h1>
	<a href="/play" class="menu_btn play-btn">Грати</a>
	<a href="/settings" class="menu_btn settings">Налаштування</a>
	<a href="/rules" class="menu_btn rules-btn">Правила гри</a>

	<a href="https://github.com/Gafum" target="_blank" class="madeBy">Dmytro Marchuk</a>
</div>

<style>
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
		transition-property: filter, box-shadow;
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
		filter: brightness(1.3);
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
	}
</style>
