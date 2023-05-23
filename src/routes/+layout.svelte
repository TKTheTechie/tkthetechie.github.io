<script lang="ts">
	import '../app.postcss';
	import './styles.css';
	import { currentPage } from '../stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { siteMap } from '../stores';
	import { Svrollbar } from 'svrollbar';

	let pageNumber = 0;

	function sitePageChange(): void {
		let href = window.location.href;
		if (/^(https?:\/\/)?[\w.-]+(:\d+)?(\/)?$/.test(href)) currentPage.set('Home');
		else currentPage.set(href.substring(href.lastIndexOf('#') + 1, href.length));
		pageNumber = (siteMap.has(get(currentPage)) ? siteMap.get(get(currentPage)) : -1) ?? -1;
	}

	onMount(() => {
		sitePageChange();

		window.addEventListener('hashchange', () => {
			sitePageChange();
		});
	});
</script>

<Svrollbar />
<div class="app">
	<main>
		<slot />
	</main>
	<div
		class="mr-5 mb-2 fixed bottom-0 right-0 w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center md: visible"
	>
		{#if pageNumber >= 0}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="square"
				stroke-linejoin="round"
			>
				{#if pageNumber == 0}
					<line x1="12" y1="5" x2="12" y2="19" />
					<polyline points="19 12 12 19 5 12" />
				{:else}
					<text x="3" y="18">0{pageNumber}</text>
				{/if}
			</svg>
		{/if}
	</div>
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
