<script>
	export let name = 'Мирний',
		description = 'Ну шо ш?',
		myImg = 'Man2',
		bigDescription = 'Я Люблю спати вночі...',
		tag = '';

	let flipped = false;

	function flip() {
		flipped = !flipped;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={'card ' + tag} class:show={flipped} on:click={flip}>
	<div class="back">
		<div class="imgWrapper">
			<img src="/assets/cards/{myImg}.png" class="my-img" alt={name} />
		</div>
		<div class="my-text">
			<h2>{name}</h2>
			<p>{description}</p>
		</div>
	</div>
	<div class="front">
		<h2>{name}</h2>
		<p>{bigDescription}</p>
	</div>
</div>

<style>
	.card {
		width: 85vw;
		height: 54vmax;
		min-height: 360px;
		max-height: 600px;
		border-radius: 15px;
		transform: rotateY(180deg);
		transition: transform 0.4s;
		transform-style: preserve-3d;
		user-select: none;
		cursor: pointer;
		box-shadow: 0px 4px 5px #262626;
	}

	.card.show {
		transform: rotateY(0);
	}

	.front,
	.back {
		transform-style: preserve-3d;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		backface-visibility: hidden;
		border-radius: 10px;
		border: 1px solid black;
		box-sizing: border-box;
		padding: 25px;
	}

	.front {
		background-color: white;
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		flex-direction: column;
		gap: 15px;
		padding: 10px;
	}

	.back {
		transform: rotateY(180deg);
		background-color: white;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20px;
		justify-items: center;
		overflow: hidden;
	}

	.imgWrapper {
		max-height: 100%;
	}

	.my-img {
		max-width: 100%;
		max-height: 100%;
		border-radius: 10px;
		margin: auto;
		object-fit: contain;
	}

	.my-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 20px;
	}

	.back h2,
	.front h2 {
		font-size: 60px;
	}

	.back p {
		font-size: 40px;
		text-align: center;
		text-wrap: balance;
	}

	.front > p {
		font-size: 25px;
		text-align: center;
		text-wrap: balance;
		max-width: 1300px;
		font-weight: 500;
	}

	@media (max-width: 720px) {
		.back {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 10px;
			overflow: hidden;
		}

		.back p,
		.front p {
			font-size: 20px;
		}

		.imgWrapper {
			max-height: 75%;
		}

		.my-text {
			justify-content: flex-start;
			gap: 5px;
		}

		.my-text > h2,
		.front > h2 {
			font-size: 40px;
		}
	}

	@media (max-width: 480px) {
		.card {
			height: 360px;
			min-height: 330px;
		}

		.back {
			padding: 14px;
		}

		.back p {
			font-size: 20px;
			font-weight: 500;
		}
		.back h2,
		.front > h2 {
			font-size: 25px;
		}

		.front {
			gap: 7px;
		}

		.front > p {
			font-size: 15px;
			max-width: auto;
		}
	}
</style>
