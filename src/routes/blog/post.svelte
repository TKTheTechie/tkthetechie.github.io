<script>
	import '../../app.postcss';
	import './styles.css';
	import Header from '../Header.svelte';
	import Time from 'svelte-time';

	export let title;
	export let author;
	export let headerImage;
	export let date;
	export let category;
</script>

<svelte:head>
	<title>TKTheTechie.io - {title}</title>
</svelte:head>

<div class="header bg-gray-950">
	<Header open={false} sidebar={false} />
</div>
<div class="sm:w-full md:w-2/3 mt-10 flex flex-col items-start mx-auto max-w-screen-md">
	<h1 class="post-title">{title}</h1>
	<div class="post-meta mb-5" id="post-meta">
		{author} / <Time timestamp={date} format="MMMM DD, YYYY" /> / {category}
	</div>

	<div class=" mb-20">
		<img src="/images/blog/headers/{headerImage}" alt="header" class="header-image" />
	</div>

	<div class="flex flex-wrap w-full items-center ml-10 mr-10">
		<slot />
	</div>
	<hr class="m-5 text-gray-500 w-full" />
</div>

<style>
	.header {
		position: sticky;
		padding: 10px;
		top: 0;
		background: black;
		z-index: 50;
		font-size: 1.5rem;
	}

	.post-title {
		font-family: Inter;
		font-size: 2.625rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: #ffffff;
	}

	.post-meta {
		font-size: 0.6rem;
		font-weight: 500;
		color: white;
	}

	.header-image {
		max-width: 880px;
		max-height: 418px;
		width: 100%;
	}
</style>
