<script lang="ts">
	import { Grid } from '$lib/loz';
	import Tile from '$lib/Tile.svelte';
	let grid = new Grid(5);
</script>

<h1>Loops of Zen <br />{grid.size}x{grid.size}</h1>

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
	:global(html, body) {
		margin: 0 auto;
		background: #262927;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	h1 {
		font-family: 'Ubuntu Thin', Tahoma, Geneva, Verdana, sans-serif;
		color: rgba(119, 196, 145, 0.397);
		margin: 50px;
		pointer-events: none;
	}

	.grid {
		margin: 0 auto;
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
