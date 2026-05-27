<script>
	import { Users, Moon, Plus } from 'lucide-svelte';

	let night = 1;
	function addNight() {
		night++;
	}
</script>

<header class="header">
	<div class="title">
		<Users size={22} color="#fff" class="mobile-hidden-icon" />
		<h1>Панель ведучого</h1>
	</div>

	<button class="night-btn" on:click={addNight}>
		<Moon size={17} color="#fff" />
		Ніч {night}
		<Plus size={15} color="#fff" />
	</button>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;

		background: #161616;
		padding: 14px;
		border-radius: 14px;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	h1 {
		font-size: 21px;
		color: white;
	}

	.night-btn {
		background: #1f1f1f;
		color: white;
		border: none;
		border-radius: 10px;
		padding: 10px 14px;

		display: flex;
		align-items: center;
		gap: 7px;

		cursor: pointer;
		transition: transform 0.2s;
	}

	.night-btn:active {
		opacity: 0.9;
		transform: scale(0.95);
	}

	@media (max-width: 500px) {
		.header {
			flex-direction: column;
			align-items: stretch;
		}

		.night-btn {
			justify-content: center;
		}

		h1 {
			text-align: center;
			width: 100%;
		}
	}
</style>
