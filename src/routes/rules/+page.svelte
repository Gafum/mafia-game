<script>
	import StandardLinks from '../../lib/UI/StandardLinks.svelte';
	import RulesList from './RulesList.svelte';
</script>

<div class="main-conteiner rules-conteiner">
	<h3>Правила гри:</h3>
	<RulesList />
	<a href="/roles">Персонажі</a>
	<StandardLinks />
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

	a {
		text-align: center;
		display: block;
		padding: 8px 16px;
		background-color: #2c9182;
		border-radius: 5px;
		font-size: 20px;
		transition: box-shadow 0.2s;
		width: 100%;
		max-width: 500px;
		margin: 20px auto;
	}

	@media (hover: hover) {
		a:hover {
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
		a {
			padding: 5px 10px;
			font-size: 14px;
		}
	}
</style>
