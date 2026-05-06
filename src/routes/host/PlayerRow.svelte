<script>
	import { CircleQuestionMark, GripVertical } from 'lucide-svelte';
	import RoleDetailsModal from '../play/RoleDetailsModal.svelte';
	import { bigDescriptionList } from '$lib/data';

	export let player;
	export let index = 0;
	export let alive = true;
	export let isDragging = false;
	export let isDragOver = false;
	export let onToggle = () => {};
	export let onDragStart = () => {};
	export let onDragOver = () => {};
	export let onDrop = () => {};
	export let onDragEnd = () => {};

	let showInfo = false;
	const roleData = bigDescriptionList[player.tag] ?? bigDescriptionList.mans;

	function handleInfoClick() {
		showInfo = true;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="player-row {isDragging ? 'dragging' : ''} {isDragOver ? 'drag-over' : ''}"
	draggable="true"
	on:dragstart={(event) => onDragStart(event, index)}
	on:dragover={(event) => onDragOver(event, index)}
	on:drop={(event) => onDrop(event, index)}
	on:dragend={onDragEnd}
>
	<div class="row-handle" aria-label="Drag handle">
		<GripVertical size="20" />
	</div>

	<div class="row-index">{index + 1}</div>

	<div class="row-meta">
		<div class="role-icon-box">
			<svelte:component this={roleData.icon} size="24" />
		</div>
		<div>
			<div class="role-name">{roleData.name}</div>
			<div class="role-subtitle">{player.description}</div>
		</div>
	</div>

	<button class="info-button" type="button" on:click={handleInfoClick} aria-label="View role info">
		<CircleQuestionMark size="20" />
	</button>

	<button
		class="status-button"
		type="button"
		on:click={() => onToggle(index)}
		aria-label="Toggle player status"
	>
		<span class:selected={alive}>{alive ? 'Alive' : 'Eliminated'}</span>
	</button>

	<RoleDetailsModal heroId={roleData.tag} open={showInfo} on:close={() => (showInfo = false)} />
</div>

<style>
	.player-row {
		display: grid;
		grid-template-columns: 40px 1fr auto auto;
		gap: 14px;
		align-items: center;
		padding: 16px 18px;
		border-radius: 18px;
		background: rgba(26, 26, 28, 0.82);
		border: 1px solid rgba(255, 255, 255, 0.08);
		transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
		cursor: grab;
	}

	.player-row.dragging {
		opacity: 0.65;
		transform: scale(0.99);
	}

	.player-row.drag-over {
		border-color: #c33f3f;
		box-shadow: 0 0 0 3px rgba(195, 63, 63, 0.16);
	}

	.row-handle {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.05);
		color: #f4f4f4;
	}

	.row-index {
		font-size: 0.95rem;
		font-weight: 700;
		color: #f3f3f3;
		opacity: 0.75;
	}

	.row-meta {
		display: flex;
		gap: 12px;
		align-items: center;
		min-width: 0;
	}

	.role-icon-box {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.06);
		color: #f8d76d;
		flex-shrink: 0;
	}

	.role-name {
		font-size: 1rem;
		font-weight: 700;
		color: #fefefe;
		line-height: 1.1;
	}

	.role-subtitle {
		font-size: 0.82rem;
		color: #c4c4d5;
		opacity: 0.88;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.info-button,
	.status-button {
		border: none;
		border-radius: 14px;
		min-width: 110px;
		padding: 12px 14px;
		background: rgba(255, 255, 255, 0.06);
		color: #f4f4f4;
		transition: background 0.2s ease, transform 0.15s ease;
		cursor: pointer;
	}

	.info-button:hover,
	.status-button:hover {
		background: rgba(255, 255, 255, 0.1);
		transform: translateY(-1px);
	}

	.status-button span {
		font-weight: 700;
		color: #f4f4f4;
	}

	.status-button span.selected {
		color: #ff5b5b;
		text-decoration: line-through;
		opacity: 0.9;
	}

	@media (max-width: 820px) {
		.player-row {
			grid-template-columns: 40px 1fr;
			grid-template-rows: auto auto;
			gap: 12px;
			padding: 16px;
		}

		.info-button,
		.status-button {
			width: 100%;
			min-width: auto;
		}

		.row-handle,
		.row-index {
			grid-row: 1;
		}

		.info-button {
			grid-column: 1 / -1;
		}

		.status-button {
			grid-column: 1 / -1;
			justify-self: stretch;
		}
	}

	@media (max-width: 520px) {
		.player-row {
			border-radius: 16px;
			padding: 14px;
		}

		.row-handle,
		.row-index {
			width: 36px;
			height: 36px;
		}

		.status-button,
		.info-button {
			padding: 12px;
			border-radius: 12px;
		}
	}
</style>
