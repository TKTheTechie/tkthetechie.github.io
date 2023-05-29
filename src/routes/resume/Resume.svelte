<script lang="ts">
	import { currentPage } from '../../stores';

	let page = '';

	currentPage.subscribe((value) => {
		page = value;
	});

	export let configuredPage = '';
	export let reloadOnShow = false;
</script>

<div
	class="{page == configuredPage
		? 'zoom-background'
		: 'plain-background'} flex justify-center items-center"
>
	{#if reloadOnShow && configuredPage != page}
		<!--Do nothing//-->
	{:else}
		<slot />
	{/if}
</div>

<style>
	.plain-background {
		width: 100%;
		height: 100%;
		background-image: var(
			--background-image,
			url('/images/code-background.png')
		); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
	}

	.zoom-background {
		position: relative;

		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.zoom-background::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: var(
			--background-image,
			url('/images/code-background.png')
		); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		transform: scale(1);
		opacity: 0;
		animation: zoomAnimation 3s forwards 0.3s;
		z-index: -1;
	}
	@keyframes zoomAnimation {
		0% {
			transform: scale(1.5);
			opacity: 0;
		}
		100% {
			transform: scale(1); /* Adjust the zoom level (e.g., 1.2 for 20% zoom) */
			opacity: 1;
		}
	}
</style>
