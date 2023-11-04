<div class="main-conteiner">
	<h1>Mafia</h1>
	<a href="/play" class="play-btn">Грати</a>
	<a href="/settings">Налаштування</a>
</div>

<style>
	.main-conteiner {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		height: 100%;
		width: 100%;
		gap: 20px;
		background-color: #111;
	}

	.main-conteiner > h1 {
		color: #912c2c;
		font-size: 80px;
		font-weight: bold;
		transition: text-shadow 0.2s;
	}

	.main-conteiner > a {
		font-size: 30px;
		background-color: #493066;
		padding: 10px 20px;
		border-radius: 10px;
		color: rgb(235, 235, 235);
		transition-property: filter box-shadow;
		transition-duration: 0.2s;
	}

	.main-conteiner > a.play-btn {
		font-size: 70px;
		background-color: #2c9182;
	}

	@media (hover: hover) {
		.main-conteiner > h1:hover {
			text-shadow: 0 0 7px rgb(185, 57, 57);
			filter: brightness(1.1);
		}
		a:hover {
			filter: brightness(1.2);
			box-shadow: 0 0 10px #493066;
		}

		a.play-btn:hover {
			box-shadow: 0 0 12px #2c9182;
		}
	}

	a:active {
		filter: brightness(1.3);
	}
</style>
