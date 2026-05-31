<script>
	import { maxPlayerAmount } from '$lib/functions/findSpecialKeys';
	import { Users, Annoyed } from 'lucide-svelte';
	export let totalPlayers = 0;
</script>

<header>
	<h1><Annoyed style="stroke: #ff4444;" size={32} class="mobile-hidden-icon" /> Налаштування</h1>
	<div class="total-badge">
		<Users size={18} />
		<span>
			{totalPlayers}
			/
			{maxPlayerAmount}
		</span>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		border-bottom: 1px solid #333;
		padding-bottom: 15px;
	}

	header h1 {
		color: #fff;
		font-size: 1.4rem;
		display: flex;
		align-items: center;
		gap: 10px;
		margin: 0;
	}

	.total-badge {
		background: #ff4444;
		color: white;
		padding: 6px 12px;
		border-radius: 20px;
		font-size: 0.9rem;
		font-weight: bold;
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.total-badge span {
		color: #fff;
	}

	@media (max-width: 400px) {
		header {
			flex-direction: column;
			gap: 10px;
			border-bottom: none;
			padding-bottom: 3px;
		}
	}
</style>
