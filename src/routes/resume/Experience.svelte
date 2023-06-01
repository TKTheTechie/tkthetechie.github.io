<script lang="ts">
	import Countup from 'svelte-countup';

	import ZoomBackgroundWrapper from '../ZoomBackgroundWrapper.svelte';
</script>

<ZoomBackgroundWrapper
	configuredPage={'Experience'}
	--background-image="url(/images/laptop-background.jpeg)"
>
	<div
		class="flex flex-col sm:flex-row w-3/4 text-center items-center mt-16 mb-16 h-fit xl:h-screen"
	>
		<div class="w-full sm:w-auto">
			<div class="heading-title mb-5 text-center">
				<span class="counter">
					<Countup initial={1} value={15} step={1} duration={1500} />

					<sup><span class="sup">+</span></sup>
				</span>
				Years of
				<span style="color:#039c5f">Experience</span>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-full sm:w-1/3">
					<div class="experience-years text-center">2018 - Present</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-company">
						Solace. <br /> Vice President - Americas, Systems Engineering
					</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-job">
						In this role, I lead a highly technical team of ~15 Systems Engineers across North and
						South America that is responsible for solutioning the Solace PubSub+ Platform into
						architectures across multiple industry verticals such as Capital Markets, Banking,
						Retail, IoT, Aviation and Government
					</div>
				</div>
			</div>

			<div class="flex justify-center mt-8 mb-8">
				<hr class="w-3/4 border-1 border-gray-500" />
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-full sm:w-1/3">
					<div class="experience-years text-center">2017 - 2018</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-company">
						Capital One <br /> Manager, Card Tech
					</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-job">
						Manager for a new team of engineers in New York for the upmarket credit card business.
						Responsible for building out microservices in AWS using agile methodologies that brings
						innovative features to our customers to help them get the most from their credit cards
					</div>
				</div>
			</div>

			<div class="flex justify-center mt-8 mb-8">
				<hr class="w-3/4 border-1 border-gray-500" />
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-full sm:w-1/3">
					<div class="experience-years text-center">2006 - 2017</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-company">
						Deutsche Bank <br /> Vice President - Lead Messaging Middleware Specialist/Application Developer
					</div>
				</div>
				<div class="w-full sm:w-1/3">
					<div class="experience-job">
						Lead for an enterprise messaging middleware group that looks after the messaging
						middleware stack for mission-critical real-time trading systems. This is a
						multi-disciplinary position that encompasses client management, technical expertise,
						application development, documentation, architecture, vendor management, and project
						planning.
					</div>
				</div>
			</div>

			<div class="flex justify-center mt-8 mb-10">
				<hr class="w-3/4 border-1 border-gray-500 mb-5" />
			</div>
		</div>
	</div>
</ZoomBackgroundWrapper>

<style>
	.counter {
		font-size: 4.5rem;
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
		font-size: 2.625rem;
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
</style>
