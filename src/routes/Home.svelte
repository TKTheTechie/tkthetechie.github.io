<script lang="ts">
	import tkthetechie from '$lib/images/TKTheTechie-main.png';
	import ZoomBackgroundWrapper from './ZoomBackgroundWrapper.svelte';
</script>

<ZoomBackgroundWrapper
	configuredPage={'Home'}
	--background-image="url(/images/home-background.png)"
>
	<div class="flex justify-center items-center mt-16 mb-16 h-screen">
		<div class="grid grid-cols-1">
			<div class="text-center w-full">
				<h1>Thomas Kunnumpurath</h1>
			</div>
			<div class="flex items-center justify-center mb-5">
				<img src={tkthetechie} alt="logo" width="450px" height="450px" />
			</div>
			<div class="flex items-center justify-center mb-16">
				<div class="bg-gray-950 rounded-lg p-6 sm:full md:w-1/2">
					<p>
						I'm a passionate technologist that has experience leading high performing Engineering
						teams. This site aims to serve as an interactive online upto date resume and also houses
						my professional blog entries. You will also find my portfolio of work that is part of
						the public domain.
					</p>
				</div>
			</div>
		</div>
	</div>
</ZoomBackgroundWrapper>
