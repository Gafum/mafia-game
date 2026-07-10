<script>
	import { Users, Moon, Plus } from 'lucide-svelte';
	import '$lib/UI/Buttons/SimpleLink.css';

	let night = 1;
	function addNight() {
		night++;
	}
</script>

<header class="header">
	<div class="title">
		<Users size={22} class="mobile-hidden-icon" />
		<h1>Панель ведучого</h1>
	</div>

	<button
		class="link-style red"
		on:click|preventDefault={addNight}
		style="font-size: 1.1rem; min-height: 33px; margin: 0; width: auto;"
	>
		<Moon size={17} />
		Ніч {night}
		<Plus size={15} />
	</button>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;

		background: #181818;
		padding: 14px;
		border-radius: 14px;
		border: 1px solid #222;
		border-top: 3px solid #ff4444;
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

	@media (max-width: 500px) {
		.header {
			flex-direction: column;
			align-items: stretch;
		}

		h1 {
			text-align: center;
			width: 100%;
		}
	}
</style>
