<script>
	import { gameRules } from '$lib/data';
</script>

<ol class="rules-list">
	{#each gameRules as { title, description }}
		<li>
			<span>{title}: </span>{description}
		</li>
	{/each}
</ol>

<style>
	.rules-list {
		margin-top: 14px;
	}

	.rules-list > li {
		color: white;
		margin-left: 20px;
		margin-top: 10px;
	}

	.rules-list span {
		color: white;
		font-size: 23px;
		text-shadow: 0 0 2px rgb(148, 148, 148);
	}

	@media (max-width: 480px) {
		.rules-list > li {
			font-size: 14px;
		}

		.rules-list span {
			color: white;
			font-size: 17px;
		}
	}
</style>
