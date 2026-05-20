<script>
	import StandardLinks from '$lib/UI/StandardLinks.svelte';
	import { gameRules } from '$lib/data';
	import NumberedList from '$lib/UI/NumberedList.svelte';
	import SimpleLink from '$lib/UI/Buttons/SimpleLink.svelte';
</script>

<div class="main-conteiner rules-conteiner">
	<h3>Правила гри</h3>

	<NumberedList list={gameRules} textStyles="font-size: 18px;" indexStyles="padding-top: 5px;" />

	<SimpleLink href="/roles" type="green">Персонажі</SimpleLink>
	<StandardLinks />
</div>

<style>
	h3 {
		text-align: center;
	}

	.rules-conteiner {
		padding: 20px 25px 50px;
		color: white;
	}

	.rules-conteiner > h3 {
		color: white;
		font-size: 25px;
		margin-bottom: 20px;
	}

	@media (max-width: 480px) {
		.rules-conteiner {
			padding: 16px 10px 50px;
		}

		.rules-conteiner > h3 {
			font-size: 18px;
		}
	}
</style>
