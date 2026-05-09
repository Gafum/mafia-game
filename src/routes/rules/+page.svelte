<script>
	import RulesList from './RulesList.svelte';
</script>

<div class="main-conteiner rules-conteiner">
	<h3>Правила гри:</h3>
	<RulesList />
	<div class="rules-btns-conteiner">
		<a href="/roles">Персонажі</a>
		<a href="/">Головна</a>
	</div>
</div>

<style>
	.rules-conteiner {
		padding: 20px 25px 50px;
		color: white;
	}

	.rules-conteiner > h3 {
		color: white;
		font-size: 25px;
	}

	.rules-btns-conteiner {
		display: flex;
		justify-content: center;
		align-items: center;
		align-content: center;
		gap: 20px;
		margin-top: 25px;
	}

	.rules-btns-conteiner > a {
		padding: 8px 16px;
		background-color: #2c9182;
		border-radius: 5px;
		font-size: 20px;
		transition: box-shadow 0.2s;
	}

	@media (hover: hover) {
		.rules-btns-conteiner > a:hover {
			box-shadow: 0 0 7px #2c9182;
		}
	}

	@media (max-width: 480px) {
		.rules-conteiner {
			padding: 16px 10px 50px;
		}

		.rules-conteiner > h3 {
			font-size: 18px;
		}
		.rules-btns-conteiner > a {
			padding: 5px 10px;
			font-size: 14px;
		}
	}
</style>
