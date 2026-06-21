<script>
	import { isCustomRule, setCustomRule } from '$lib/stores';
	import * as Icons from 'lucide-svelte';

	export let active;
	export let roleData;
	export let tag;

	function handleChange(e) {
		active = e.target.checked;

		if (isCustomRule(tag)) {
			setCustomRule(tag, active);
		}
	}
</script>

<label class="role-checkbox" class:active>
	<input type="checkbox" bind:checked={active} on:change={handleChange} />

	<div class="role-box-content">
		<svelte:component this={Icons[roleData.icon]} size={25} color="#ffffff" />
		<span>{roleData.name}</span>
	</div>
</label>

<style>
	.role-checkbox {
		cursor: pointer;
	}

	.role-checkbox input {
		display: none;
	}

	.role-box-content {
		background: #1a1a1a;
		border: 1px solid #333;
		padding: 10px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: #777;
		transition: all 0.2s ease;
	}

	.role-box-content span {
		color: #fff;
		font-size: 1.2rem;
		max-width: 140px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: keep-all;
		white-space: nowrap;
	}

	@media (hover: hover) {
		.role-checkbox:hover .role-box-content {
			border-style: dashed;
			border-color: #ff4444;
		}
	}

	.role-checkbox.active .role-box-content {
		border-style: solid;
		border-color: #ff4444;
		background: rgba(255, 68, 68, 0.1);
	}

	@media (max-width: 500px) {
		.role-box-content span {
			max-width: none;
		}
	}
</style>
