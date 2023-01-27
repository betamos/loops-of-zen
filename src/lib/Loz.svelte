<script lang="ts">
	import { Grid } from '$lib/loz';
	import Tile from '$lib/Tile.svelte';
	let size = 5;
	let interval: null | ReturnType<typeof setInterval> = null;
	let grid: Grid;
	let seconds = NaN;
	$: {
		grid = new Grid(size);
	}
	function maybeStartTimer() {
		if (interval) return;
		seconds = 0;
		interval = setInterval(() => {
			seconds++;
		}, 1000);
	}
	function stopTimer() {
		if (interval) {
			clearInterval(interval);
			interval = null;
		}
	}
	$: if (grid.success) {
		stopTimer();
	}
	function decrSize() {
		if (size <= 2) return;
		size--;
		stopTimer();
		seconds = NaN;
	}
	function incrSize() {
		size++;
		stopTimer();
		seconds = NaN;
	}
</script>

<div class="prefs" class:success={grid.success}>
	<div>
		<button on:click={decrSize}>-</button>
		<span>{size}×{size}</span>
		<button on:click={incrSize}>+</button>
	</div>
	&nbsp;
	{#if !isNaN(seconds)}
		{seconds}s
	{/if}
	&nbsp;
</div>

<div
	class="grid"
	style="grid-template-columns: repeat({grid.size}, 50px)"
	class:success={grid.success}
>
	{#each grid.tiles as row, y}
		{#each row as tile, x}
			<div
				on:keydown={null}
				on:click={() => {
					grid.rotateTile({ x, y }, 1);
					maybeStartTimer();
					grid = grid;
				}}
				on:contextmenu={(e) => {
					grid.rotateTile({ x, y }, -1);
					maybeStartTimer();
					grid = grid;
					e.preventDefault();
				}}
				class="cell"
			>
				<Tile {tile} />
			</div>
		{/each}
	{/each}
</div>

<button class="continue" class:visible={grid.success} on:click={incrSize}>Continue</button>

<style>
	.prefs {
		color: #77c491;
		user-select: none;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
		opacity: 0.4;
		transition: 0.5s;
		margin-bottom: 20px;
	}

	.prefs.success {
		opacity: 1;
	}

	button {
		margin: 0 10px;
		background: transparent;
		border: none;
		border-radius: 5px;
		padding: 3px 8px;
		text-align: center;
		font-size: 15px;
		outline: 1px solid rgba(255, 255, 255, 0.363);
		color: rgb(255, 255, 255);
		transition: 0.2s;
	}

	.prefs button {
		opacity: 0;
	}

	button:hover {
		background: #fff1;
		color: #fff;
	}

	.prefs:hover button {
		opacity: 1;
	}

	.grid {
		display: grid;
		grid-auto-flow: row;
		filter: brightness(1);
		transition: 1s;
	}
	.grid.success {
		pointer-events: none;
		filter: brightness(1.8);
	}
	.cell {
		width: 50px;
		height: 50px;
		transition: 0.1s;
		border-radius: 10px;
	}
	.cell:hover {
		stroke-width: 2;
		box-shadow: 1px 2px 1px #0002;
		background: rgba(181, 255, 181, 0.06);
	}

	.continue {
		padding: 10px;
		margin: 0 auto;
		width: 100px;
		opacity: 0;
	}

	.continue.visible {
		opacity: 1;
	}
</style>
