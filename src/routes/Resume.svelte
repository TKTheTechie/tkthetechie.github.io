<script lang="ts">
	import Countup from 'svelte-countup';
	import { currentPage } from '../stores';

	let page = '';

	currentPage.subscribe((value) => {
		page = value;
	});
</script>

<div
	class="{page == 'Resume'
		? 'zoom-background'
		: 'plain-background'} flex justify-center items-center h-screen"
>
	<div class="grid grid-flow-dense grid-cols-3 w-3/4 text-center items-center">
		<div class="col-span-3 heading-title mb-5 text-center">
			<span class="counter">
				{#if page == 'Resume'}
					<Countup initial={1} value={15} step={1} duration={1500} />
				{:else}
					15
				{/if}
				<sup><span class="sup">+</span></sup>
			</span>
			Years of
			<span style="color:#039c5f">Experience</span>
		</div>

		<div class="experience-years text-center">2018 - Present</div>
		<div class="experience-company">
			Solace. <br /> Vice President - Americas, Systems Engineering
		</div>
		<div class="experience-job">
			In this role, I lead a highly technical team of ~15 Systems Engineers across North and South
			America that is responsible for solutioning the Solace PubSub+ Platform into architectures
			across multiple industry verticals such as Capital Markets, Banking, Retail, IoT, Aviation and
			Government
		</div>

		<div class="col-span-3 flex justify-center mt-8 mb-8">
			<hr class="w-3/4 border-1 border-gray-500" />
		</div>

		<div class="experience-years text-center">2017 - 2018</div>
		<div class="experience-company">
			Capital One <br /> Vice President - Americas, Systems Engineering
		</div>
		<div class="experience-job">
			Manager for a new team of engineers in New York for the upmarket credit card business.
			Responsible for building out microservices in AWS using agile methodologies that brings
			innovative features to our customers to help them get the most from their credit cards
		</div>

		<div class="col-span-3 flex justify-center mt-8 mb-8">
			<hr class="w-3/4 border-1 border-gray-500" />
		</div>

		<div class="experience-years text-center">2006 - 2017</div>
		<div class="experience-company">
			Deutsche Bank <br /> Vice President - Lead Messaing Middleware Specialist/Application Developer
		</div>
		<div class="experience-job">
			Lead for an enterprise messaging middleware group that looks after the messaging middleware
			stack for mission critical real time trading systems. This is a multi-disciplinary position
			that encompasses client-management, technical expertise, application development,
			documentation, architecture, vendor management, and project planning.
		</div>

		<div class="col-span-3 flex justify-center mt-8 mb-10">
			<hr class="w-3/4 border-1 border-gray-500" />
		</div>
	</div>
</div>

<style>
	.counter {
		font-size: 6.5rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.sup {
		font-size: 2.5rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.02em;
	}

	.heading-title {
		font-size: 3.625rem;
		line-height: 1.15em;
		font-family: Inter;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.experience-years {
		font-size: 1.125rem;
		font-weight: 700;
		display: block;
		letter-spacing: -0.02em;
	}

	.experience-job {
		color: #aeaeae;
		font-size: 12px;
	}

	.zoom-background {
		background-image: url('images/code-background.png'); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
		background-size: 200%;
		animation: zoomAnimation 5s;
		animation-fill-mode: forwards;
		animation-delay: 0.3s;
		opacity: 0;
	}

	.plain-background {
		background-image: url('images/code-background.png'); /* Replace 'path/to/your/image.jpg' with the actual path to your image */
		background-size: 200%;
	}

	@keyframes zoomAnimation {
		0% {
			background-size: 200%;
			opacity: 0;
		}
		100% {
			background-size: 100%; /* Adjust the zoom level (e.g., 120% for 20% zoom) */
			opacity: 1;
		}
	}
</style>
