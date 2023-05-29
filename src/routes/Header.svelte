<script lang="ts">
	import Hamburger from './Hamburger.svelte';
	import Sidebar from './Sidebar.svelte';
	import SocialBar from './SocialBar.svelte';

	import logo from '$lib/images/header-logo.png';

	export let open: boolean;
	export let sidebar = true;
</script>

<header>
	<div class="corner">
		<a href="https://tkthetechie.io">
			<img src={logo} alt="tkthetechie.io" width="100%" height="15px" />
		</a>
	</div>

	<nav class="invisible lg:visible">
		<SocialBar />
	</nav>

	<div class="hamburger {sidebar==false?'invisible':''}">
		<Hamburger bind:open />
	</div>
</header>

<style>




	header {
		display: flex;
		justify-content: space-between;
		height: 50px;
		position: sticky;
		padding: 10px;
		top: 0;
		background: black;
		z-index: 50;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	nav {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hamburger {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		cursor: pointer;
	}
</style>
