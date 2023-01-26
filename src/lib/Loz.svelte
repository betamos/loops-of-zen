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

<div class="grid" class:success={grid.success}>
	<svg width={grid.size * 50} viewBox="0 0 {100 * grid.size} {100 * grid.size}">
		{#each grid.tiles as row, y}
			{#each row as tile, x}
				<g
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
					transform="translate({x * 100}, {y * 100})"
				>
					<rect class="disc" width="100" height="100" rx="20" fill="transparent" />
					<Tile {tile} />
				</g>
			{/each}
		{/each}
	</svg>
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
		margin: 50px auto;
		/* swidth: 400px;
		heisght: 400px; */
		display: grid;
		grid-auto-flow: row;
		filter: brightness(1);
		transition: 1s;
	}
	.grid.success {
		pointer-events: none;
		filter: brightness(1.8);
	}
	g:hover .disc {
		/* strokse-dasharray: 10, 10; */
		stroke-width: 2;
		filter: drop-shadow(5px 7px 3px rgb(0 0 0 / 1));

		/* stroke: #4c5c4473;
		fill: #262927; */
		fill: rgba(181, 255, 181, 0.06);
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
