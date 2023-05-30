<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { siteMap } from '../stores';
	import '../lib/fullpage.parallax.min.js';
	// @ts-ignore
	import fullpage from '../lib/fullpage.extensions.min.js';

	// @ts-ignore
	let fp;

	onMount(() => {
		fp = new fullpage('#fullpage', {
			parallaxKey: '16E9C3FF-FEDC42B5-AC45D278-D3AED2B8',
			parallax: true,
			anchors: Array.from(siteMap.keys()),
			licenseKey: 'gplv3-license',
			controlArrows: true,
			controlArrowsHTML: ['<div class="tk-arrow" ></div>', '<div class="tk-arrow" ></div>']
		});
	});

	onDestroy(() => {
		fp.destroy();
	});
</script>

<div id="fullpage">
	<slot />
</div>

<style>
</style>
