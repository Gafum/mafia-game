<script>
	import { CircleQuestionMark } from 'lucide-svelte';
	import RoleDetailsModal from '$lib/UI/Modals/RoleDetailsModal.svelte';
	import { bigDescriptions } from '$lib/stores';
	import { tagMap } from '$lib/functions/createListByTags';
	import Randomizer from '$lib/Servises/Randomizer.servise';

	export let tag = '',
		myIndex = 0,
		showingElement = 0,
		changeData = () => {};

	const personData = tagMap[tag]
		? tagMap[tag][Randomizer.randomInteger(0, tagMap[tag].length - 1)]
		: { myImg: 'Man1', description: '' };

	let typeData;
	bigDescriptions.subscribe(($desc) => {
		typeData = $desc[tag] ?? $desc.mans;
	});

	$: imgSrc = personData.myImg?.startsWith('data:')
		? personData.myImg
		: `/assets/cards/${personData.myImg}.png`;

	let flipped = false;
	let isShown = false;

	function flip(event) {
		if (showingElement !== myIndex) return;

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

	let imageError = false;
	let imageLoaded = false;
	let showDetails = false;

	function handleImageError() {
		imageError = true;
	}

	function handleImageLoad() {
		imageLoaded = true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="card"
	style={'--side: ' + (myIndex % 2 ? '160%' : '-100%')}
	class:show={flipped}
	class:hide={isShown}
	on:click={flip}
>
	<div class="back" />
	<div class="front">
		<div class="imgWrapper">
			{#if !imageLoaded || imageError}
				<svelte:component this={typeData.icon} color="#000000" class="fallback-icon" />
			{/if}

			<img
				src={imgSrc}
				class="my-img"
				alt={typeData.name}
				on:load={handleImageLoad}
				on:error={handleImageError}
				loading="lazy"
			/>
		</div>

		<div class="my-text">
			<h2>{typeData.name}</h2>
			<p>{personData.description}</p>
		</div>

		<button
			class="info-button"
			type="button"
			on:click|stopPropagation={() => (showDetails = true)}
			aria-label="Show role details"
		>
			<CircleQuestionMark size="30" color="#f7f7f7" />
		</button>
	</div>

	<RoleDetailsModal heroTag={tag} open={showDetails} on:close={() => (showDetails = false)} />
</div>

<style>
	.card {
		--side: -100%;
		top: 0;
		right: 0;
		position: absolute;
		width: 85vw;
		min-width: 185px;
		max-width: 1500px;
		height: 80vh;
		border-radius: 15px;
		transform: rotateY(180deg) translate(-50%, -50%);
		transition-duration: 0.4s;
		transition-property: transform, visibility, opacity;
		transform-style: preserve-3d;
		user-select: none;
		cursor: pointer;
		box-shadow: 0px 4px 5px #262626;
		z-index: 10;
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
		position: relative;
		max-width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		min-width: 230px;
	}

	:global(.fallback-icon) {
		max-height: 100%;
		position: absolute;
		z-index: 0;
		width: 120px;
		height: 120px;
	}

	.my-img {
		position: relative;
		z-index: 1;
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

	.info-button {
		position: absolute;
		top: 14px;
		right: 14px;
		width: 52px;
		height: 52px;
		border-radius: 16px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(24, 24, 28, 0.94);
		color: #ffffff;
		display: grid;
		place-items: center;
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
		z-index: 3;
		pointer-events: auto;
		touch-action: manipulation;
	}
	@media (hover: hover) {
		.info-button:hover {
			transform: translateY(-2px);
			box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28);
		}
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
			min-width: auto;
		}

		.my-img {
			height: auto;
			color: transparent;
		}

		.my-text {
			justify-content: flex-start;
			gap: 5px;
		}

		.info-button {
			top: 12px;
			right: 12px;
			width: 44px;
			height: 44px;
			border-radius: 14px;
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

		:global(.fallback-icon) {
			width: 80px;
			height: 80px;
		}
	}
</style>
