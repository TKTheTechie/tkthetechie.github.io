<script lang="ts">
	let redirectLink = window.location.href.substring(
		window.location.href.lastIndexOf('/'),
		window.location.href.length
	);
</script>

<svelte:head>
	<title>TKTheTechie.io Error</title>
</svelte:head>

<div class="blogLink text-center justify-center align-middle mt-52">
	Are you looking for a blog entry on my site? Try this <a
		href="https://tkthetechie.io/blog{redirectLink}">Link</a
	>
</div>

<style>
	.blogLink a {
		text-decoration: underline;
		color: green;
	}
</style>
