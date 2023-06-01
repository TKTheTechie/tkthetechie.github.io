<script lang="ts">
	import ZoomBackgroundWrapper from './ZoomBackgroundWrapper.svelte';

	import { currentPage } from '../stores';
	import PostCard from './blog/PostCard.svelte';
	import { fade } from 'svelte/transition';
	let postPromise = getPosts();

	async function getPosts() {
		const response = await fetch('blog/api/posts');
		const data = await response.json();
		return {
			data
		};
	}

	let page = '';

	currentPage.subscribe((value) => {
		page = value;
	});

	export let configuredPage = 'Blog';
</script>

{#await postPromise}
	Loading posts...
{:then posts}
	<ZoomBackgroundWrapper {configuredPage} --background-image="url(/images/blog-background.png)">
		<div class="flex flex-col justify-center items-center">
			<div class="heading-title w-full text-center">
				<span style="color:#039c5f">Blog</span>
			</div>
			<div id="posts" class="w-2/3 mx-auto mb-16">
				<div class="flex flex-col">
					<div class="flex flex-wrap justify-center">
						{#each posts.data as post}
							<PostCard {post} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	</ZoomBackgroundWrapper>
{:catch someError}
	<div class="error">Unable to load posts</div>
{/await}
