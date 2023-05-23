<script>
	import './css/fullpage.css';
	import FullPageWrapper from './FullPageWrapper.svelte';
	import Experience from './resume/Experience.svelte';
	import Proficiency from './resume/Proficiency.svelte';
	import Header from './Header.svelte';
	import Sidebar from './Sidebar.svelte';
	import Home from './Home.svelte';
	import Education from './resume/Education.svelte';

	let open = false;
</script>

<div class="main app h-fit xl:h-screen">
	<div class="header">
		<Header bind:open />
	</div>

	<Sidebar bind:open />

	<FullPageWrapper>
		<div class="section">
			<Home />
		</div>
		<div class="section">
			<Experience />
		</div>
		<div class="section">
			<Proficiency />
		</div>
		<div class="section">
			<Education />
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
