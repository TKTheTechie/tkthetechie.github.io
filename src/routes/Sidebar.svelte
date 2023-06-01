<script>
	import close from '$lib/images/close.svg';

	import SocialBar from './SocialBar.svelte';
	import { fade } from 'svelte/transition';
	import { currentPage } from '../stores';

	export let open = false;

	let page;

	currentPage.subscribe((value) => {
		page = value;
	});
</script>

{#if open}
	<aside
		class="absolute w-full md:w-1/5 h-full bg-gray-950 border-r-2 shadow-lg {open
			? 'visible'
			: 'invisible'}"
		out:fade
	>
		<div class="close-button top-0 right-0">
			<button
				on:click={() => {
					open = !open;
				}}
			>
				<img src={close} alt="close" />
			</button>
		</div>

		<nav class="p-12 text-xl bg-gray-950" in:fade>
			<a
				class="block"
				href="#Home"
				on:click={() => {
					open = false;
				}}><span class="text-lg">{page == 'Home' ? '>' : ''}</span>Home</a
			>
			<a
				class="block"
				href="#Experience"
				on:click={() => {
					open = false;
				}}
				><span class="text-lg"
					>{page == 'Experience' || page == 'Education' || page == 'Proficiency' ? '>' : ''}</span
				>Resume</a
			>
			<a
				class="block"
				href="#Portfolio"
				on:click={() => {
					open = false;
				}}><span class="text-lg">{page.includes('Portfolio') ? '>' : ''}</span>Portfolio</a
			>
			<a
				class="block"
				href="#Blog"
				on:click={() => {
					open = false;
				}}><span class="text-lg">{page == 'Blog' ? '>' : ''}</span>Blog</a
			>
		</nav>
		<SocialBar />
	</aside>
{/if}

<style>
	aside {
		right: 0;
		animation: slide-in 1s forwards;
		z-index: 100;
		font-size: 2rem;
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #ccc;
		height: 100%;
	}

	aside a {
		position: relative;
		padding-bottom: 0.5em;
	}

	aside a:hover {
		color: green;
	}

	.close-button {
		position: absolute;
		top: 0;
		right: 0;
		margin: 0.5rem;
		cursor: pointer;
		z-index: 1000;
	}

	nav a {
		opacity: 0;
		animation: slide-in 1s forwards;
	}

	@keyframes slide-in {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0%);
			opacity: 1;
		}
	}
</style>
