<script>
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function closeHint(e) {
		e.stopPropagation();
		dispatch('close');
	}
</script>

<div class="flip-hint">
	<div class="mini-card-wrapper">
		<div class="mini-card">
			<div class="mini-face mini-front" />
			<div class="mini-face mini-back" />
		</div>
	</div>

	<span class="hint-text">
		Переверни натиском <span class="mobile-hidden-icon hint-text">картку</span>
	</span>

	<button class="close-hint-btn" on:click={closeHint} aria-label="Закрити підказку">
		<X size={18} style="stroke: #18181b" strokeWidth={3} />
	</button>
</div>

<style>
	.flip-hint {
		position: absolute;
		top: 15px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 4px 6px 4px 14px;
		background: #f4f4f5;
		border: 1px solid #e4e4e7;
		border-radius: 24px;
		pointer-events: auto;
		z-index: 99;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		animation: gentleOpacity 4s infinite ease-in-out;
	}

	.mini-card-wrapper {
		width: 13px;
		height: 16px;
		perspective: 100px;
	}

	.mini-card {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		animation: 3s infinite cardSpin cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	.mini-face {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 3px;
		border: 1.5px solid #18181b;
		backface-visibility: hidden;
		box-sizing: border-box;
	}

	.mini-front {
		background: #ff4444;
	}

	.mini-back {
		background: #ffffff;
		transform: rotateY(180deg);
	}

	.flip-hint .hint-text {
		font-size: 13px;
		font-weight: 600;
		color: #18181b;
		white-space: nowrap;
	}

	.close-hint-btn {
		background: none;
		border: none;
		padding: 7px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.close-hint-btn:hover {
		background-color: #e4e4e7;
	}

	@keyframes gentleOpacity {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 0.9;
		}
	}

	@keyframes cardSpin {
		0% {
			transform: rotateY(0deg);
		}
		40%,
		50% {
			transform: rotateY(180deg);
		}
		90%,
		100% {
			transform: rotateY(360deg);
		}
	}

	@media (max-width: 480px) {
		.flip-hint {
			top: 10px;
			padding: 4px 6px 4px 10px;
			gap: 8px;
		}
		.flip-hint span {
			font-size: 13px;
		}
		.mini-card-wrapper {
			width: 10px;
			height: 16px;
		}
	}

	@media (max-width: 270px) {
		.flip-hint {
			gap: 3px;
		}
		.flip-hint .hint-text {
			white-space: unset;
			text-align: center;
		}
		.mini-card-wrapper {
			display: block;
			width: 20px;
			height: 18px;
		}
	}
</style>
