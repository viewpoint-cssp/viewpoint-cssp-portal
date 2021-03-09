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
			data available locally on your PC. This JWPlayer video works through
			the ERA5 download and using the pre-processor on some example data.
			<iframe
				:src="setSrc(video.id, video.altId)"
				:title="video.title"
				:data-id="video.id"
				:data-alt-id="video.altId"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="video.id || video.altId"
			></iframe>
			<img class="youtube" src="../../assets/images/training-6.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: 'Data',
	props: {
		altId: Boolean
	},
	data() {
		return {
			video: { id: '', altId: '', title: 'Meteorological data' }
		}
	},
	methods: {
		setSrc(id, altId) {
			// set the source video depending on whether normal or altId mode is selected
			const video = this.altId && altId ? altId : id
			return `https://cdn.jwplayer.com/players/${video}-NocosEfA.html`
		}
	}
}
</script>

<style scoped>
</style>
