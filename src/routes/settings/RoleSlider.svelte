<script>
	export let label;
	export let value;
	export let max;
	export let min = 0;
	import { handleNumericInput, normalize } from './inputHelpers';

	function onInput(e) {
		const res = handleNumericInput(e, max);
		if (res.success) value = res.value;
		else e.target.value = value;
	}
</script>

<div class="role-control">
	<div class="label-row">
		<label for={label}>{label}</label>
		<input
			id={label}
			type="text"
			{value}
			on:input={onInput}
			on:blur={() => (value = normalize(value, min, max))}
		/>
	</div>
	<input type="range" {min} {max} bind:value class="red-slider" />
</div>

<style>
	.role-control {
		margin-bottom: 25px;
	}

	.label-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	.label-row label {
		color: #fff;
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.label-row input {
		background: #222;
		border: 1px solid #444;
		color: #ff4444;
		width: 50px;
		padding: 5px;
		text-align: center;
		border-radius: 6px;
		font-weight: bold;
		font-size: 1.1rem;
	}

	.red-slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		background: #333;
		border-radius: 3px;
		outline: none;
	}

	.red-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		background: #ff4444;
		border-radius: 50%;
		cursor: pointer;
	}
</style>
