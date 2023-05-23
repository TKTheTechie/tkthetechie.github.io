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
			licenseKey: 'gplv3-license'
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
