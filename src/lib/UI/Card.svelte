<script>
	export let name = 'Мирний',
		description = 'Ну шо ш?',
		myImg = 'Man2',
		id = 0,
		showingElement = 0,
		elementIndex = 0,
		changeData = () => {
			console.log('hi');
		};

	let flipped = false;
	let isShown = false;

	function flip(event) {
		if (showingElement !== id) return;

		if (!flipped) {
			flipped = true;
		} else {
			if (!isShown) {
				isShown = true;
				event.target.onclick = '';
				changeData();
				setTimeout(() => (flipped = false), 400);
			}
		}
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="card"
	style={'--side: ' + (elementIndex % 2 ? '160%' : '-100%')}
	class:show={flipped}
	class:hide={isShown}
	on:click={flip}
>
	<div class="back" />
	<div class="front">
		<div class="imgWrapper">
			<img src="/assets/cards/{myImg}.png" class="my-img" alt={name} />
		</div>
		<div class="my-text">
			<h2>{name}</h2>
			<p>{description}</p>
		</div>
	</div>
</div>

<style>
	.card {
		--side: -100%;
		top: 0;
		right: 0;
		position: absolute;
		width: 85vw;
		height: 80vh;
		border-radius: 15px;
		transform: rotateY(180deg) translate(-50%, -50%);
		transition-duration: 0.4s;
		transition-property: transform, visibility, opacity;
		transform-style: preserve-3d;
		user-select: none;
		cursor: pointer;
		box-shadow: 0px 4px 5px #262626;
	}

	.card.show {
		transform: rotateY(0) translate(50%, -50%);
	}

	.card.hide {
		transform: rotateY(0) translate(var(--side), -50%);
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
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

	.back {
		transform: rotateY(180deg);
		background-image: url('/assets/back-side.png');
		background-position: center;
		background-size: contain;
		background-repeat: no-repeat;
		background-color: black;
	}

	.front {
		background-color: white;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		justify-items: center;
		overflow: hidden;
	}

	/* IMG WITH contain size WORKING!!!! */

	.imgWrapper {
		max-width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
	}

	.my-img {
		max-width: 100%;
		max-height: 100%;
		height: calc(40vw - 60px);
		aspect-ratio: 1/1;
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
		gap: 10px;
	}

	.my-text > h2 {
		font-size: 50px;
		text-align: center;
	}

	.my-text > p {
		font-size: 30px;
		text-align: center;
	}

	@media (max-width: 850px) {
		.front {
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			gap: 10px;
			overflow: hidden;
		}

		.imgWrapper {
			height: auto;
		}

		.my-img {
			height: auto;
		}

		.my-text {
			justify-content: flex-start;
			gap: 5px;
		}
	}

	@media (max-width: 500px) {
		.my-text h2 {
			font-size: 35px;
		}
		.my-text > p {
			font-size: 20px;
			text-align: center;
		}
	}
</style>
