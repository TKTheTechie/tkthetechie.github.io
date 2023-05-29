<script lang="ts">
    import '../../app.postcss';
	import './styles.css';
	import Header from '../Header.svelte';
	import Sidebar from '../Sidebar.svelte';
	import Time from 'svelte-time';

	let open = false;

	export let title;
    export let author;
    export let headerImage;
    export let date;
    export let category;
</script>
<div class="header bg-gray-950">
	<Header bind:open sidebar={false} />
</div>
<div class="w-2/3 mt-10 flex flex-col items-start mx-auto max-w-screen-md">
	<h1 class="post-title justify-between">{title}</h1>
	<div class="post-meta mb-5" id="post-meta">{author} / <Time timestamp="{date}" format="MMMM DD, YYYY" /> / {category}</div>

	<div class="header-image mb-20">
		<img src="/images/blog/headers/{headerImage}" width="880" height="418">
	</div>


	<div class="flex flex-wrap text-left w-full">
        <slot />
	</div>
	<hr class="m-5 text-gray-500 w-full" >
</div>

<style>




.header {
	position: sticky;
	padding: 10px;
	top: 0;
	background: black;
	z-index: 50;
	font-size:1.5rem;
}

.header img {
	max-height:auto;
	max-width:auto;
	padding: 0 0 0 0;
	height:auto;
	width:auto;
}

	.post-title {
		font-family: Inter;
   		font-size: 2.625rem;
    	font-weight: 700;
    	letter-spacing: -.02em;
    	line-height: 1.15;
    	color: #ffffff;
	}

	.post-meta {
		font-size: .6rem;
    	font-weight: 500;
   		color: white;
	}

	.header-img {
		display: block;
		margin: 0 auto;
		-webkit-transition: -webkit-transform 1s cubic-bezier(.46,.03,.52,.96);
		transition: -webkit-transform 1s cubic-bezier(.46,.03,.52,.96);
		transition: transform 1s cubic-bezier(.46,.03,.52,.96);
		transition: transform 1s cubic-bezier(.46,.03,.52,.96),-webkit-transform 1s cubic-bezier(.46,.03,.52,.96);
		-webkit-transform: scale(1) translateZ(0);
		transform: scale(1) translateZ(0);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		will-change: transform;
	}
	
</style>

