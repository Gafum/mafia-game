<script>
	export let name = 'Мирний',
		description = 'Ну шо ш?',
		myImg = 'Man2',
		bigDescription = 'Я Люблю спати вночі';

	let flipped = false;

	function flip() {
		flipped = !flipped;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="card" class:show={flipped} on:click={flip}>
	<div class="back">
		<img src="/assets/cards/{myImg}.png" class="my-img" alt={name} />
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
		height: 80vh;
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
		padding: 0;
	}

	.back {
		transform: rotateY(180deg);
		background-color: white;
		display: flex;
		justify-content: center;
		gap: 20px;
		align-items: center;
		align-content: center;
		flex-direction: column;
	}

	.my-img {
		min-width: 100px;
		width: 45vmax;
		max-width: 100%;
		max-height: 100%;
		border-radius: 10px;
	}

	.my-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 10px;
	}

	.my-text > h2,
	.front > h2 {
		font-size: 50px;
		text-align: center;
	}

	.my-text > p,
	.front > p {
		font-size: 25px;
		text-align: center;
		text-wrap: balance;
		max-width: 70vw;
	}

	@media (max-width: 480px) {
		.my-img {
			width: 30vmax;
		}

		.front {
			gap: 7px;
		}

		.front > h2 {
			font-size: 30px;
			max-width: auto;
		}
		.front > p {
			font-size: 15px;
			max-width: auto;
		}

		.my-text > h2,
		.front > h2 {
			font-size: 40px;
		}
	}

	@media (min-width: 720px) {
		.back {
			display: flex;
			justify-content: center;
			gap: 60px;
			flex-direction: row;
		}
		.my-text > p {
			font-size: 40px;
		}
		.my-text > h2,
		.front > h2 {
			font-size: 80px;
			text-align: left;
		}
	}
</style>
