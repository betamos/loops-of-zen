<script lang="ts">
	import type { Tile, Pos } from './loz';
	import { Edge } from './loz';
	export let tile: Tile;

	$: dots = getDots(tile);
	$: path = getPath(dots);

	function getPos(o: number): Pos {
		if (o == 0) {
			return { x: 50, y: 0 };
		} else if (o == 1) {
			return { x: 100, y: 50 };
		} else if (o == 2) {
			return { x: 50, y: 100 };
		} else if (o == 3) {
			return { x: 0, y: 50 };
		}
		throw new Error('out of bounds');
	}
	function getDots(tile: Tile): Pos[] {
		const dots = new Array<Pos>();
		for (const [o, val] of tile.shape.entries()) {
			if (val == Edge.On) {
				const pos = getPos(o);
				dots.push(pos);
				//dots.push({ x: pos.y, y: pos.x });
			}
		}
		return dots;
	}
	function getPath(dots: Pos[]): string {
		if (dots.length == 0) {
			return '';
		}
		if (dots.length == 1) {
			return `M 50 50 L ${dots[0].x} ${dots[0].y}`;
		}
		const segments: string[] = [];
		dots.forEach((dot, idx) => {
			if (idx == 0) {
				segments.push(`M ${dot.x} ${dot.y}`);
				return;
			}
			//let cmd = idx ? 'L' : 'M'; // first is move
			const str = ['Q', 50, 50, dot.x, dot.y].join(' ');
			segments.push(str);
		});
		const dot = dots[0];
		const str = ['Q', 50, 50, dot.x, dot.y].join(' ');
		if (dots.length > 2) {
			segments.push(str);
		}
		//segments.push('Z');
		return segments.join(' ');
	}
</script>

<svg viewBox="0 0 100 100" style="transform: rotate({tile.rotation * 90}deg)">
	<path
		d={path}
		fill="transparent"
		stroke-width="21"
		stroke-linecap="inherit"
		stroke-linejoin="inherit"
		stroke="currentColor"
	/>
	{#if dots.length == 1}
		<circle cx={50} cy={50} r="25" fill="currentColor" stroke-width="7" />
	{/if}
</svg>

<style>
	svg {
		color: #416b2e;
		transition: 0.15s;
		display: block;
	}
</style>
