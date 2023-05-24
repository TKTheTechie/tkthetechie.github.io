<script lang="ts">
	import Header from '../../Header.svelte';
	import Sidebar from '../../Sidebar.svelte';

	let open = false;

	export let data;
</script>
<div class="header bg-gray-950">
	<Header bind:open sidebar={false} />

	<h1>{data.title}</h1>

	<svelte:component this={data.content} />
</div>


