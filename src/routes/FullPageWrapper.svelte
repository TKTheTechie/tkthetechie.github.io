<script>
	import { onMount, onDestroy } from 'svelte';
	import { siteMap } from '../stores';
	// @ts-ignore
	import * as fullpage from 'fullpage.js';

	// @ts-ignore
	let fp;
  let init = false;

	onMount(() => {

    if(!init) {
		fp = new fullpage('#fullpage', {
        anchors: Array.from(siteMap.keys()),
        licenseKey: 'gplv3-license',
        controlArrows: true,
        controlArrowsHTML: ['<div class="tk-arrow" ></div>', '<div class="tk-arrow" ></div>']
		  });
    init=true;
  }else {
      fp.reBuild();
  }


	});

  onDestroy(()=>{
    console.log('Destroyed')
  })

	
</script>

<div id="fullpage">
	<slot />
</div>

<style>

</style>
