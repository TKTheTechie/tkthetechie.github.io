<script>
	import { onMount, onDestroy } from 'svelte';
	import { siteMap } from '../stores';
	// @ts-ignore
	import * as fullpage from 'fullpage.js';

	// @ts-ignore
	let fp;

	onMount(() => {
		console.log('mounted');

		fp = new fullpage('#fullpage', {
			onSlideLeave: (section, origin, destination, direction, trigger) => {
				console.log('Hit');
			},
			anchors: Array.from(siteMap.keys()),
			licenseKey: 'gplv3-license',
			controlArrows: true,
			controlArrowsHTML: ['<div class="fp-arrow" ></div>', '<div class="fp-arrow" ></div>']
		});
	});

	onDestroy(() => {
		console.log('destroyed');
		// @ts-ignore
		if (fp) {
			fp.destroy();
		}
	});
</script>

<div id="fullpage">
	<slot />
</div>

<style>
	.fp-arrow.fp-next {
		border-width: 38.5px 0 38.5px 34px;
		border-color: transparent transparent transparent #039c5f;
	}
</style>
