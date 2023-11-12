<script>
	import { page } from '$app/stores';
	import HomeBtn from '$lib/UI/HomeBtn.svelte';
</script>

<div class="center-conteiner">
	<h2 class="text">{$page.status} : {$page.error.message}</h2>
	<p class="text">
		Виникла проблема. Якщо після переходу на <a class="text" href="/">головну сторінку</a> вона не зникне,
		то повідомте про це адміністратора
	</p>
	<HomeBtn size="50" />
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

	.center-conteiner > .text {
		color: white;
		text-align: center;
	}

	a.text {
		color: white;
		font-weight: bold;
		text-decoration: underline;
	}

	.center-conteiner > h2.text {
		font-size: 35px;
	}
</style>
