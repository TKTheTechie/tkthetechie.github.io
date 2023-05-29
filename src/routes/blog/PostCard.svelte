<script lang="ts">
    import Time from 'svelte-time';
    let readMore: boolean;

    export let post;
</script>


<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 m-2" on:mouseenter={()=>{readMore=true;}} on:mouseleave={()=>{readMore=false;}} >
    <a href="{post.path}" target="_blank">
    <div  class="max-w-full rounded-lg shadow-md  bg-gray-800 p-2 post-card">
        <div class="post-thumbnail w-full">
        <img src="images/blog/headers/{post.meta.headerImage}" />
        </div>
        <div class="post-content pb-1 w-auto" >
            <div class="post-meta" id="post-meta">{post.meta.category} / <Time timestamp="{post.meta.date}" format="MMMM DD, YYYY" /> </div>
            <div class="post-header mt-5 {readMore?'text-green-500':''}">{post.meta.title}</div>
            
            <div class="read-more text-right bottom-0 right-0 {readMore?'text-green-500':'text-gray-800'}">Read More →</div>
        </div>
    </div>
    </a>
</div>

<style>
    .post-meta {
		font-size: .6rem;
    	font-weight: 500;
   		color: white;
	}

    .post-header {
        font-weight:800;
        text-overflow: ellipsis;
        overflow-x: visible;
        overflow-y: hidden;
        width: 100%;
        font-size: 10pt;
    }

    .read-more {
        font-size:8pt;
        font-weight: 500;
        bottom: 0;
        right: 0;
        
    }

    


</style>