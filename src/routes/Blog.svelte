<script lang="ts">
  	import { currentPage } from '../stores';
    import PostCard from './blog/PostCard.svelte';
    import { fade } from 'svelte/transition';
    let postPromise = getPosts();

    async function getPosts() {
        const response = await fetch('blog/api/posts');
        const data = await response.json()
        return {
            data
        }
    };

	let page = '';

	currentPage.subscribe((value) => {
		page = value;
	});

	export let configuredPage = 'Blog';
	export let reloadOnShow = false;


</script>




{#await postPromise}
    Loading posts...
{:then posts}

<div
	class="{page == configuredPage
		? 'zoom-background'
		: 'plain-background'} flex flex-col justify-center items-center " 
>

	{#if reloadOnShow && configuredPage != page}
		<!--Do nothing//-->
	{:else}
    <div class="heading-title mb-5 w-full text-center mt-16 ">
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
    
	{/if}
</div>

{:catch someError}
<div class="error">Unable to load posts</div>
{/await}


<style>
	.plain-background {
		width: 100%;
		height: 100%;
		background-image: var(
			--background-image,
			url('images/blog-background.png')
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
			url('images/blog-background.png')
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
