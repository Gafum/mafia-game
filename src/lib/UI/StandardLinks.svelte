<script>
	import { page } from '$app/stores';
	import { House, Play } from 'lucide-svelte';
	export let size = 50;
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
		<Play {size} color="#fff" />
	</a>

	<a href="/">
		<House {size} color="#fff" />
	</a>
</div>

<style>
	.standard-links {
		max-width: 220px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20px auto 0;
		padding: 0 10px;
		min-width: 220px;
	}

	@media (max-width: 340px) {
		.standard-links {
			min-width: auto;
		}
	}
</style>
