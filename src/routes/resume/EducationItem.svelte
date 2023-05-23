<script>
	export let title = '';
	export let subTitle = '';
	export let imgSrc = '';

	export let lastItem = false;
</script>

<div
	class="flex flex-col items-center w-full md:w-1/2 l:w-1/2 xl:w-1/2 p-2 {lastItem ? 'mb-16' : ''}"
>
	<div class="h-auto bg-black rounded-lg shadow-lg shadow-gray-950 w-full max-w-md">
		<div class="flex items-center">
			<div class="bg-gray-950 m-1">
				<img src={imgSrc} style="width:100px;height:100px;" alt="exp1" />
			</div>
			<div class="flex-1 p-4">
				<div class="title">{title}</div>
				<div class="subTitle">{subTitle}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.title {
		font-size: 12px;
	}

	.subTitle {
		font-size: 10px;
	}
</style>
