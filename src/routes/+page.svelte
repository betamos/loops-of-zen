<script lang="ts">
	import Loz from '$lib/Loz.svelte';
</script>

<h1>Loops of Zen</h1>

<Loz />

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
</style>
