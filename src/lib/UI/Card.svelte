<script>
	import { CircleQuestionMark, X } from 'lucide-svelte';
	import { bigDescriptionList } from '$lib/data';

	export let description = 'Ну шо ш?',
		myImg = 'Man2',
		id = 0,
		tag = 'mans',
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

	let imageError = false;
	let imageLoaded = false;
	let showDetails = false;

	$: roleData = bigDescriptionList[tag] ?? bigDescriptionList.mans;

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
	style={'--side: ' + (elementIndex % 2 ? '160%' : '-100%')}
	class:show={flipped}
	class:hide={isShown}
	on:click={flip}
>
	<div class="back" />
	<div class="front">
		<div class="imgWrapper">
			{#if !imageLoaded || imageError}
				<svelte:component
					this={bigDescriptionList[tag].icon}
					color="#000000"
					class="fallback-icon"
				/>
			{/if}

			<img
				src="/assets/cards/{myImg}.png"
				class="my-img"
				alt={bigDescriptionList[tag].name}
				on:load={handleImageLoad}
				on:error={handleImageError}
				loading="lazy"
			/>
		</div>

		<div class="my-text">
			<h2>{bigDescriptionList[tag].name ?? bigDescriptionList.mans.name}</h2>
			<p>{description}</p>
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

	{#if showDetails}
		<div class="details-overlay" on:click={() => (showDetails = false)}>
			<div class="details-panel" on:click|stopPropagation>
				<button
					class="details-close"
					type="button"
					on:click|stopPropagation={() => (showDetails = false)}
					aria-label="Close details"
				>
					<X color="#fff" size="26" />
				</button>
				<div class="details-header">
					<svelte:component this={roleData.icon} class="details-icon" color="#fff" />
					<div>
						<h3>{roleData.name}</h3>
						<p class="details-subtitle">Деталі</p>
					</div>
				</div>
				<p class="details-description">{roleData.description}</p>
			</div>
		</div>
	{/if}
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

	.info-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28);
	}

	.details-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(12px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 24px;
		z-index: 50;
		animation: fadeInOverlay 220ms ease forwards;
		border-radius: 10px;
	}

	.details-panel {
		position: relative;
		width: min(520px, 100%);
		background: rgba(14, 14, 18, 0.98);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 24px 90px rgba(0, 0, 0, 0.55);
		backdrop-filter: blur(18px);
		border-radius: 28px;
		padding: 32px 26px 30px;
		color: #f7f7f7;
		overflow-y: auto;
		max-height: min(85vh, calc(100vh - 80px));
		transform: translateY(18px);
		opacity: 0;
		animation: slideUpPanel 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
	}

	.details-close {
		position: absolute;
		top: 32px;
		right: 32px;
		width: 42px;
		height: 42px;
		border: none;
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.08);
		color: #f7f7f7;
		cursor: pointer;
		font-size: 18px;
		line-height: 1;
		transition: background 0.2s ease;
	}

	.details-close:hover {
		background: rgba(255, 255, 255, 0.16);
	}

	:global(.details-close svg) {
		transform: translateY(1px);
	}

	.details-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 18px;
	}

	:global(.details-icon) {
		width: 54px;
		height: 54px;
		color: #f8d76d;
		flex-shrink: 0;
	}

	.details-header h3 {
		margin: 0;
		font-size: 2.3rem;
		letter-spacing: 0.01em;
		color: #ffffff;
	}

	.details-subtitle {
		margin: 6px 0 0;
		color: #c7c7d3;
		font-size: 0.95rem;
	}

	.details-description {
		margin: 0;
		font-size: 1.4rem;
		line-height: 1.75;
		color: #e7e7e9;
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

	@media (max-width: 650px) {
		.details-overlay {
			align-items: flex-end;
			justify-content: flex-end;
			padding: 0;
			position: absolute;
		}

		.details-panel {
			width: 100vw;
			width: calc(100vw + 4px);
			max-width: 103vw;
			border-radius: 24px 24px 0 0;
			padding: 24px 18px 26px;
			margin: 0;
			min-height: 50vh;
			align-self: flex-end;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			animation: slideUpMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
		}

		.details-close {
			top: 24px;
			right: 24px;
		}

		.details-header {
			gap: 12px;
		}

		.details-header h3 {
			font-size: 1.75rem;
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

		:global(.details-icon) {
			width: 38px;
			height: 38px;
		}

		.details-header h3 {
			font-size: 21px;
		}

		.details-subtitle {
			margin-top: 2px;
		}

		.details-panel {
			top: 50%;
			min-height: 100vh;
			height: 100vh;
			animation: slideUpSmallMobile 260ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
			border-radius: 0;
		}
	}

	@media (max-width: 300px) {
		:global(.details-icon) {
			width: 25px;
			height: 25px;
		}
		.details-header {
			gap: 8px;
		}

		.details-header h3 {
			font-size: 20px;
		}

		.details-subtitle {
			display: none;
		}

		.details-close {
			top: 15px;
		}

		.details-description {
			font-size: 1.3rem;
		}
	}

	@keyframes fadeInOverlay {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUpPanel {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideUpMobile {
		from {
			opacity: 0;
			transform: translate(-50%, 50%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0%);
		}
	}

	@keyframes slideUpSmallMobile {
		from {
			opacity: 0;
			transform: translate(-50%, 400%);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%);
		}
	}
</style>
