<script>
	import './css/fullpage.css';
	import FullPageWrapper from './FullPageWrapper.svelte';
	import Main from './Main.svelte';
	import Resume from './Resume.svelte';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';

	let open = false;
</script>

<div class="main app">
	<div class="header">
		<Header bind:open />
	</div>

	<Sidebar bind:open />

	<FullPageWrapper>
		<div class="section">
			<Main />
		</div>
		<div class="section">
			<Resume />
		</div>
		<div class="section">
			<div class="intro">
				<h1>Scroll Down</h1>
				<p>And it will animate down to the first section</p>
			</div>
		</div>
	</FullPageWrapper>
</div>

<style>
	.header {
		position: sticky;
		padding: 10px;
		top: 0;
		background: black;
		z-index: 50;
	}

	.main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100%;
	}

	.sidebar {
		transition: right 0.5s ease-in-out;
	}
</style>
