<script>
	import { page } from '$app/stores';
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
</script>

<div class="center-conteiner">
	<h2 class="text">{$page.status} : {$page.error.message}</h2>
	<p class="text">
		<a href="/" class="text"
			>Виникла проблема. Якщо після переходу на <span class="link-text">головну сторінку</span> вона
			не зникне, то повідомте про це адміністратора</a
		>
	</p>
	<StandardLinks />
</div>

<style>
	.center-conteiner {
		display: flex;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		align-content: center;
		flex-direction: column;
		gap: 15px;
		padding: 10px;
	}

	.center-conteiner .text {
		color: white;
		text-align: center;
	}

	.link-text {
		color: white;
		font-weight: bold;
		text-decoration: underline;
	}

	.center-conteiner > h2.text {
		font-size: 35px;
	}
</style>
