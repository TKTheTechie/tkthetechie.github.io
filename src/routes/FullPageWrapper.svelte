<script>
	import { onMount, onDestroy } from 'svelte';
	import { siteMap } from '../stores';
	// @ts-ignore
	import fullpage from 'fullpage.js';

	// @ts-ignore
	let fp;

	onMount(() => {
		fp = new fullpage('#fullpage', {
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
