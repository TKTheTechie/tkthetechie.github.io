<script lang="ts">
	import Resume from './Resume.svelte';
	import EducationItem from './EducationItem.svelte';
</script>

<Resume configuredPage={'Education'} --background-image="url(/images/education-background.png)">
	<div class="flex flex-wrap justify-center mt-16 mb-16 h-fit xl:h-screen w-2/3">
		<div class="w-full">
			<div class="heading-title mb-5 text-center">
				Education & <span style="color:#039c5f">Awards</span>
			</div>
		</div>

		<EducationItem
			title="New Jersey Institute Of Technology"
			subTitle="Bachelors of Science - Computer Science (4.0 Major GPA)"
			imgSrc="images/resume/njit.png"
		/>
		<EducationItem
			title="Chartered Financial Analyst"
			subTitle="Level 1"
			imgSrc="images/resume/cfa-level-1.png"
		/>
		<EducationItem
			title="Solace"
			subTitle="Certified Developer"
			imgSrc="images/resume/solace.png"
		/>

		<EducationItem title="AWS" subTitle="Certified Developer" imgSrc="images/resume/aws.png" />

		<EducationItem title="GCP" subTitle="Certified Developer" imgSrc="images/resume/gcp.png" />

		<EducationItem
			title="Solace Simply Stunning Award"
			subTitle="Global award for leading the Systems Engineering team in the Americas to hit targets"
			imgSrc="images/resume/solace.png"
		/>

		<EducationItem
			title="Deutsche Bank myRecognition Award"
			subTitle="Firmwide recognition award for building innovative applications that contributed towards application stability"
			imgSrc="images/resume/db.png"
		/>

		<EducationItem
			title="CapitalOne Hackathon - Creative Award Winner"
			subTitle="Lead a team of 6 engineers to develop a geo-location based rewards system for credit card holders"
			imgSrc="images/resume/c1.png"
			lastItem={true}
		/>
	</div></Resume
>
