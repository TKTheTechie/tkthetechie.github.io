<script lang="ts">
	import '../app.postcss';
	import './styles.css';
	import { currentPage } from '../stores';
	import { onMount } from 'svelte';

	onMount(() => {
		window.addEventListener('hashchange', () => {
			let href = window.location.href;
			currentPage.set(href.substring(href.lastIndexOf('#') + 1, href.length));
		});
	});
</script>

<!-- <Svrollbar /> -->
<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100%;
	}
</style>
