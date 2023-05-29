<script lang="ts">
	import './css/fullpage.css';
	import FullPageWrapper from './FullPageWrapper.svelte';
	import Experience from './resume/Experience.svelte';
	import Proficiency from './resume/Proficiency.svelte';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import Home from './Home.svelte';
	import Blog from './Blog.svelte';
	import Education from './resume/Education.svelte';
	import { PORTFOLIO_ITEMS } from './portfolio/portfolio-items';
	import PortfolioItem from './portfolio/PortfolioItem.svelte';

	let open = false;

	import { currentPage } from '../stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import { siteMap } from '../stores';

	let pageNumber = 0;

	function sitePageChange(): void {
		let href = window.location.href;
		if (/^(https?:\/\/)?[\w.-]+(:\d+)?(\/)?$/.test(href)) currentPage.set('Home');
		else currentPage.set(href.substring(href.lastIndexOf('#') + 1, href.length));
		if (get(currentPage).includes('Portfolio')) {
			pageNumber = siteMap.get('Portfolio') ?? -1;
		} else {
			pageNumber = (siteMap.has(get(currentPage)) ? siteMap.get(get(currentPage)) : -1) ?? -1;
		}
	}

	onMount(() => {
		sitePageChange();

		window.addEventListener('hashchange', () => {
			sitePageChange();
		});
	});
</script>

<div class="main app h-fit xl:h-screen">
	<div class="header">
		<Header bind:open />
	</div>

	<Sidebar bind:open />

	<FullPageWrapper>
		<div class="section">
			<Home />
		</div>
		<div class="section">
			<Experience />
		</div>
		<div class="section">
			<Proficiency />
		</div>
		<div class="section">
			<Education />
		</div>
		<div class="section">
			{#each PORTFOLIO_ITEMS as portfolioItem, i}
				<PortfolioItem slideIndex={i} {portfolioItem} />
			{/each}
		</div>
		<div class="section">
			<Blog />
		</div>
		</FullPageWrapper>
</div>
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

<style>
	

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100%;
	}
</style>
