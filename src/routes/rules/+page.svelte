<script>
	import { gameRules } from '$lib/data';
</script>

<div class="rules-conteiner">
	<h3>Правила гри:</h3>
	<ol class="rules-list">
		{#each gameRules as { title, description }}
			<li>
				<span>{title}: </span>{description}
			</li>
		{/each}
	</ol>

	<div class="rules-btns-conteiner">
		<a href="/roles">Персонажі</a>
		<a href="/">Головна</a>
	</div>
</div>

<style>
	.rules-conteiner {
		padding: 20px 25px 50px;
		color: white;
		padding: 20px;
	}

	.rules-conteiner > h3 {
		color: white;
		font-size: 25px;
	}

	:global(.rules-list > li) {
		color: white;
		margin-left: 20px;
		margin-top: 10px;
	}

	:global(.rules-list span) {
		color: white;
		font-size: 23px;
		text-shadow: 0 0 2px rgb(148, 148, 148);
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
		.rules-conteiner > h3 {
			font-size: 18px;
		}
		:global(.rules-list > li) {
			font-size: 15px;
		}

		:global(.rules-list span) {
			color: white;
			font-size: 20px;
		}
		.rules-btns-conteiner > a {
			padding: 5px 10px;
			font-size: 14px;
		}
	}
</style>
