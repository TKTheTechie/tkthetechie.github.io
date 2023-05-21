<script>
	import { onMount, onDestroy } from 'svelte';
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
			anchors: ['Home', 'Resume', 'Blog'],
			continuousVertical: true,
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

<style>
	#fullpage {
		height: 100vh;
	}
</style>
