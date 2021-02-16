<template>
	<div>
		<h1>Meteorological data for UMEP modelling</h1>
		<p>
			If you want to
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/GettingData/SUEWS4.html"
				target="_blank"
				rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				use your own meteorological data with UMEP</a
			>, a tutorial is provided on the UMEP website to guide you through
			the steps to download ERA5 data as an example dataset.
		</p>
		<p class="boxed">
			<strong>Warning</strong> Downloading the ERA5 data takes hours due
			to the size of the data, so consider doing this in advance of
			working through the tutorial.
		</p>
		<p>
			UMEP also has a Meteorological Pre-processor should you want to use
			data available locally on your PC. This YouTube video works through
			the ERA5 download and using the pre-processor on some example data.
			<a
				href="https://www.youtube.com/watch?v=31hhG2xoFKQ&amp;list=PLShSKbdF7w3339RUz3_5RtYwYOWuYfOzy&amp;index=6"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img class="youtube" src="../../assets/images/training-6.png" />
			</a>
		</p>
	</div>
</template>

<script>
export default {
	name: 'Data'
}
</script>

<style scoped>
p.boxed {
	padding: 8px;
	border: 1px solid var(--primaryDisabled);
}
</style>
