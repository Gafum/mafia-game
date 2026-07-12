<script context="module">
	const loadedImagesCache = new Set();
</script>

<script>
	import { onMount } from 'svelte';
	import { bigDescriptions } from '$lib/stores';
	import { tagMap } from '$lib/functions/createListByTags';
	import Randomizer from '$lib/Servises/Randomizer.servise';
	import { Icons } from '$lib/components/icons.js';
	import FlipHint from './FlipHint.svelte';

	export let tag;
	export let isFirst = false;

	let cartData = { name: tag, description: '', icon: 'User' };
	bigDescriptions.subscribe(($desc) => {
		cartData = $desc[tag] ?? { name: tag, description: '', icon: 'User' };
	});

	$: imgSrc = additionData?.myImg?.startsWith('data:')
		? additionData.myImg
		: `/assets/cards/${additionData?.myImg}.png`;

	let currentIndex = -1;
	let additionData = null;
	let flipped = false;

	let isHintOpen = true;

	let imgLoaded = false;
	let showFallbackIcon = false;
	let fallbackTimeout = null;

	let componentMounted = false;
	let animateIn = false;
	let isInitialMount = true;

	function findNextData() {
		const sameRoleList = tagMap[tag] || [];

		if (sameRoleList.length > 1) {
			if (currentIndex === -1) {
				currentIndex = Randomizer.randomInteger(0, sameRoleList.length - 1);
			} else {
				currentIndex = (currentIndex + 1) % sameRoleList.length;
			}
		} else {
			currentIndex = 0;
		}

		return sameRoleList[currentIndex];
	}

	function triggerAnimation() {
		if (!componentMounted || !imgLoaded || animateIn) return;

		requestAnimationFrame(() => {
			setTimeout(() => {
				animateIn = true;

				setTimeout(() => {
					isInitialMount = false;
				}, 450);
			}, 30);
		});
	}

	function handleImgLoad(imgName) {
		imgLoaded = true;
		showFallbackIcon = false;
		if (fallbackTimeout) clearTimeout(fallbackTimeout);
		loadedImagesCache.add(imgName);

		triggerAnimation();
	}

	function handleImgError() {
		showFallbackIcon = true;
		if (fallbackTimeout) clearTimeout(fallbackTimeout);
		animateIn = true;
		isInitialMount = false;
	}

	function flip() {
		isHintOpen = false;

		if (!flipped && tagMap[tag].length > 1) {
			const nextData = findNextData();
			const isImageChanging = additionData && nextData && additionData.myImg !== nextData.myImg;

			setTimeout(() => {
				if (isImageChanging) {
					if (!loadedImagesCache.has(nextData.myImg)) {
						imgLoaded = false;
						showFallbackIcon = false;

						fallbackTimeout = setTimeout(() => {
							if (!imgLoaded) showFallbackIcon = true;
						}, 400);
					} else {
						imgLoaded = true;
						showFallbackIcon = false;
					}
				}
				additionData = nextData;
			}, 180);
		}
		flipped = !flipped;
	}

	onMount(() => {
		additionData = findNextData();
		if (additionData && loadedImagesCache.has(additionData.myImg)) {
			imgLoaded = true;
		}

		componentMounted = true;
		triggerAnimation();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if Boolean(additionData)}
	<div class="reveal-wrapper">
		<div class={'card ' + tag} class:show={flipped} on:click={flip}>
			<div class="back">
				{#if isFirst && isHintOpen}
					<FlipHint on:close={() => (isHintOpen = false)} />
				{/if}

				<div class="imgWrapper">
					{#if showFallbackIcon}
						<svelte:component
							this={Icons[cartData.icon] || Icons.User}
							style="stroke: #000;"
							color="#000"
							class="back-icon"
						/>
					{/if}

					{#key additionData.myImg}
						{#if !showFallbackIcon}
							<div
								class="image-placeholder"
								class:hidden={animateIn ||
									(loadedImagesCache.has(additionData.myImg) && !isInitialMount)}
							/>
						{/if}
						<img
							src={imgSrc}
							class="my-img"
							class:loaded={animateIn}
							class:cached={loadedImagesCache.has(additionData.myImg) && !isInitialMount}
							alt={'⠀' + cartData.name + '⠀'}
							on:load={() => handleImgLoad(additionData.myImg)}
							on:error={handleImgError}
							loading="eager"
							decoding="sync"
						/>
					{/key}
				</div>
				<div class="my-text">
					<h2>{cartData.name}</h2>
					<p>{additionData.description}</p>
				</div>
			</div>

			<div class="front">
				<svelte:component
					this={Icons[cartData.icon] || Icons.User}
					style="stroke:#000;"
					color="#000"
					class="role-icon"
				/>
				<h2>{cartData.name}</h2>
				<p>{cartData.description}</p>
			</div>
		</div>
	</div>
{/if}

<style>
	.reveal-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}

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
		border-radius: 12px;
		border: 1px solid #232326;
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
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.my-img {
		max-width: 100%;
		max-height: min(48vmax, 512px);
		border-radius: 10px;
		margin: auto;
		object-fit: contain;
		z-index: 1;
		position: relative;
		background-color: white;

		opacity: 0;
		transform: scale(0.97);
		filter: blur(8px);

		transition: opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
			transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease-out;
		will-change: transform, opacity, filter;
	}

	.my-img.loaded {
		opacity: 1;
		transform: scale(1);
		filter: blur(0);
	}

	.image-placeholder {
		width: 0;
		height: 0;
		height: 40vmax;
		height: clamp(220px, 40vmax, 450px);
		opacity: 1;
		transition: opacity 0.3s ease 0.15s;
	}

	.image-placeholder.hidden {
		opacity: 0;
	}

	.my-img.cached {
		opacity: 1 !important;
		transform: scale(1) !important;
		filter: blur(0) !important;
		transition: none !important;
	}

	.my-text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.back h2,
	.front h2 {
		font-size: 60px;
		text-align: center;
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

	:global(.front > .role-icon) {
		position: absolute;
		top: 15px;
		right: 15px;
		width: 35px;
		height: 35px;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		transform: translateZ(1px);
	}

	:global(.imgWrapper > .back-icon) {
		position: absolute;
		z-index: 0;
		width: 70px;
		height: 70px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -120%);
		animation: 1s ease-out showIcon;
	}

	@media (max-width: 720px) {
		.card {
			width: 100%;
		}

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

		.my-img {
			max-height: 100%;
		}

		.my-text {
			justify-content: flex-start;
			gap: 5px;
		}

		.my-text > h2,
		.front > h2 {
			font-size: 40px;
		}

		:global(.front > .role-icon) {
			top: 10px;
			right: 10px;
			width: 27px;
			height: 27px;
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

		:global(.front > .role-icon) {
			top: 6px;
			right: 6px;
			width: 22px;
			height: 22px;
		}

		:global(.imgWrapper > .back-icon) {
			width: 40px;
			height: 40px;
			transform: translate(-50%, -140%);
		}
	}

	@media (max-width: 330px) {
		:global(.front > .role-icon) {
			display: none;
		}

		.image-placeholder {
			height: 0;
			height: 90vw;
			height: calc(
				100vw - 62px
			); /* (16+14+1) *2 because there paddings and border right and left  */
		}
	}

	@keyframes showIcon {
		0% {
			opacity: 0;
		}
		70% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
