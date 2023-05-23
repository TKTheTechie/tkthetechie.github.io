<script type="ts">
	export let skill = '';
	export let amount = 0;
</script>

<div class="p-5">
	<div class="skill-text mb-0.5 text-left">{skill}</div>
	<div class="h-1.5 relative max-w-xl rounded-full overflow-hidden">
		<div class="w-full h-full bg-gray-200 absolute" />
		<div class="h-full absolute progress-bar progress-bar-{amount}" />
	</div>
</div>

<style>
	.skill-text {
		font-size: 1rem;
	}

	.progress-bar {
		width: 0%;
		background-color: #039c5f;
	}

	.progress-bar-10 {
		animation: progress-animation-10 1s linear forwards;
	}

	.progress-bar-25 {
		animation: progress-animation-25 1s linear forwards;
	}

	.progress-bar-50 {
		animation: progress-animation-50 1s linear forwards;
	}

	.progress-bar-75 {
		animation: progress-animation-50 1s linear forwards;
	}

	.progress-bar-100 {
		animation: progress-animation-100 1s linear forwards;
	}

	@keyframes progress-animation-10 {
		from {
			width: 0%;
		}
		to {
			width: 10%;
		}
	}

	@keyframes progress-animation-25 {
		from {
			width: 0%;
		}
		to {
			width: 25%;
		}
	}

	@keyframes progress-animation-50 {
		from {
			width: 0%;
		}
		to {
			width: 50%;
		}
	}

	@keyframes progress-animation-100 {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}
</style>
