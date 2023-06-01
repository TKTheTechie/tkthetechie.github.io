<script lang="ts">
	import { currentPage } from '../../stores';
	import ZoomBackgroundWrapper from '../ZoomBackgroundWrapper.svelte';
	import SkillBar from './SkillBar.svelte';

	let page = '';

	currentPage.subscribe((value) => {
		page = value;
	});
</script>

<ZoomBackgroundWrapper
	configuredPage={'Proficiency'}
	--background-image="url(/images/code-background.png)"
>
	<div
		class="flex flex-col sm:flex-row w-2/3 justify-center text-center items-center mt-16 mb-16 h-fit xl:h-screen"
	>
		<div class="w-full">
			<div class="heading-title mb-5 text-center">
				Technical
				<span style="color:#039c5f">Proficiency</span>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Java'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'JavaScript'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Go'} amount={25} />
				</div>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'HTML/CSS'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Rust'} amount={50} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Elixir'} amount={50} />
				</div>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Spring Framework'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'AureliaJS'} amount={50} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'SvelteJS'} amount={50} />
				</div>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Solace PubSub+'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Kafka'} amount={50} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'TIBCO EMS'} amount={50} />
				</div>
			</div>

			<div class="flex flex-wrap justify-center">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'TIBCO RV'} amount={100} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'IBM MQ'} amount={25} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Rabbit MQ'} amount={25} />
				</div>
			</div>

			<div class="flex flex-wrap justify-center mb-20">
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'AWS'} amount={75} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'GCP'} amount={25} />
				</div>
				<div class="w-3/4 sm:w-1/3">
					<SkillBar skill={'Azure'} amount={25} />
				</div>
			</div>
		</div>
	</div></ZoomBackgroundWrapper
>

<style>
	.heading-title {
		font-size: 2.625rem;
		line-height: 1.15em;
		font-family: Inter;
		font-weight: 700;
		letter-spacing: -0.02em;
	}
</style>
