<script lang="ts">
	import Portfolio from './Portfolio.svelte';
	import type { PortfolioItem } from './portfolio-items';

	export let portfolioItem: PortfolioItem;
	export let slideIndex: number;
</script>

<div class="slide" id="slide{slideIndex + 1}">
	<Portfolio {slideIndex} --background-image="url({portfolioItem.imgSrc})">
		<a href={portfolioItem.href} target="_blank">
			<div class="flex items-center justify-center h-screen">
				<div class="w-3/4">
					<div class="h-fit flex flex-col justify-center bg-gray-950 rounded-lg shadow-lg p-6">
						<h1 class="text-2xl font-bold mb-4 link">
							{portfolioItem.title}
						</h1>
						<hr class="my-4" />
						<div class="w-full flex items-center justify-center">
							<p class="text-m">{portfolioItem.description}</p>
						</div>
					</div>
				</div>
			</div>
		</a>
	</Portfolio>
</div>

<style>
	.link {
		color: #039c5f;
	}

	.link:hover {
		color: white;
	}
</style>
