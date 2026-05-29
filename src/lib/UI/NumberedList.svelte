<script>
	export let list = [];
	export let textStyles = '';
	export let indexStyles = '';
</script>

<div class="custom-list">
	{#each list as line, index}
		<div class="line">
			<span class="index" style={indexStyles}>{index + 1}</span>
			<div class="content">
				<p class="text" style={textStyles}>{line}</p>
			</div>
		</div>
	{/each}
</div>

<style>
	.custom-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	.line {
		background: #1c1c1c;
		padding: 12px 16px;
		border-radius: 10px;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		box-shadow: 4px 4px 5px #0e0e0e60;
	}

	.line:nth-child(even) {
		background: #1b1b1b66;
		box-shadow: 4px 4px 5px #0d0d0d60;
	}

	.index {
		color: #999;
		font-size: 13px;
		font-weight: 600;
		min-width: 18px;
		padding-top: 4px;
		text-align: left;
		flex-shrink: 0;
	}

	.content {
		flex: 1;
	}

	.text {
		color: white;
		font-size: 16px;
		line-height: 1.5;
		margin: 0;
		word-break: break-word;
		text-align: left;
	}

	@media (max-width: 400px) {
		.line {
			padding: 10px 12px 12px;
			gap: 0;
		}
	}
</style>
