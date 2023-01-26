<script lang="ts">
	import { Grid } from '$lib/loz';
	import Tile from '$lib/Tile.svelte';
	let size = 5;
	$: grid = new Grid(size);
</script>

<h1>Loops of Zen</h1>

<div class="prefs">
	<button on:click={() => size--}>-</button>
	<span>{size}×{size}</span>
	<button on:click={() => size++}>+</button>
</div>

<div class="grid" class:success={grid.success}>
	<svg width={grid.size * 50} viewBox="0 0 {100 * grid.size} {100 * grid.size}">
		{#each grid.tiles as row, y}
			{#each row as tile, x}
				<g
					on:keydown={null}
					on:click={() => {
						grid.rotateTile({ x, y }, 1);
						grid = grid;
					}}
					on:contextmenu={(e) => {
						grid.rotateTile({ x, y }, -1);
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

<style>
	@import url('https://fonts.googleapis.com/css2?family=Solitreo&display=swap');

	:global(html, body) {
		margin: 20px auto;
		background: #262927;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	h1 {
		color: #77c49165;
		pointer-events: none;
		font-weight: 400;
		font-family: 'Solitreo', cursive;
		margin: 0 0;
	}

	.prefs {
		color: #77c49165;
		user-select: none;
		font-family: 'Courier New', Courier, monospace;
		font-weight: bold;
	}

	span {
		min-width: 100px;
	}

	button {
		margin: 0 10px;
		width: 25px;
		background: transparent;
		border: none;
		border-radius: 5px;
		padding: 3px 8px;
		text-align: center;
		font-size: 15px;
		outline: 1px solid #fff2;
		color: white;
		opacity: 0;
		transition: 0.2s;
	}

	button:hover {
		background: #fff1;
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
	.disc {
		/* stroke: rgba(181, 255, 181, 0.06); */
	}
	g:hover .disc {
		/* strokse-dasharray: 10, 10; */
		stroke-width: 2;
		filter: drop-shadow(5px 7px 3px rgb(0 0 0 / 1));

		/* stroke: #4c5c4473;
		fill: #262927; */
		fill: rgba(181, 255, 181, 0.06);
	}
</style>
