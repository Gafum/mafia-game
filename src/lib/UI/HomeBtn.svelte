<script>
	import { House } from 'lucide-svelte';
	export let size = 100;
</script>

<a href="/" class="home-btn">
	<House {size} color="#fff" />
</a>
