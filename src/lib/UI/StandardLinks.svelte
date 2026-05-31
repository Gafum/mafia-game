<script>
	import { page } from '$app/stores';
	import { House, Play } from 'lucide-svelte';
	export let size = 60;
	export let blockStyles = '';

	function handlePlayClick(event) {
		if ($page.url.pathname === '/play') {
			event.preventDefault();
			window.location.reload();
		}
	}
</script>

<div class="standard-links" style={blockStyles}>
	<a href="/play" on:click={handlePlayClick}>
		<Play {size} />
	</a>

	<a href="/">
		<House {size} />
	</a>
</div>

<style>
	.standard-links {
		max-width: 270px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 40px;
		width: 100%;
		margin: 20px auto 0;
		min-width: 220px;
	}

	@media (hover: hover) {
		.standard-links a:hover {
			transform: scale(1.1);
			filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
		}
	}

	@media (hover: none) {
		.standard-links a:active {
			transform: scale(0.94);
			filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.3));
		}
	}

	.standard-links a {
		display: flex;
		transition: transform 0.2s ease;
	}

	@media (max-width: 400px) {
		.standard-links {
			padding: 0 10px;
			gap: 20px;
			min-width: auto;
		}
	}
</style>
