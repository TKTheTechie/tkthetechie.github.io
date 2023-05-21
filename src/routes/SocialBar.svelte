<script lang="ts">
	import github from '$lib/images/github.svg';
	import linkedin from '$lib/images/linkedin.svg';
	import twitter from '$lib/images/twitter.svg';
</script>

<ul>
	<li>
		<a href="https://github.com/TKTheTechie" target="_blank"><img src={github} alt="GitHub" /></a>
	</li>
	<li>
		<a href="https://linkedin.com/in/TKTheTechie" target="_blank"
			><img src={linkedin} alt="LinkedIn" /></a
		>
	</li>
	<li>
		<a href="https://twitter.com/TkTheTechie" target="_blank"
			><img src={twitter} alt="Twitter" />
		</a>
	</li>
</ul>

<style>
	a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}
</style>
