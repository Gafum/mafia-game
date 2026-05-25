<script>
	export let data;
	import { fade } from 'svelte/transition';
	import { beforeNavigate, afterNavigate, disableScrollHandling } from '$app/navigation';

	beforeNavigate(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = 'hidden';
		}
	});

	afterNavigate(() => {
		disableScrollHandling();
		setTimeout(() => {
			window.scrollTo(0, 0);
			if (typeof document !== 'undefined') {
				document.body.style.overflow = '';
			}
		}, 200);
	});
</script>

{#key data.pathname}
	<div class="page-transition" in:fade={{ duration: 200, delay: 200 }} out:fade={{ duration: 200 }}>
		<slot />
	</div>
{/key}

<style>
	.page-transition {
		width: 100%;
		height: 100%;
	}
</style>
