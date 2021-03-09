<template>
	<div>
		<h1>Creating a grid in QGIS and UMEP</h1>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/GettingData/QGIS2.html"
				target="_blank" rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Learn how to generate a grid</a
			> for local scale modelling using built-in functionality in QGIS.
		</p>
		<p>
			This can then be used with these
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/GettingData/GettingData.html"
				target="_blank" rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				tutorials</a
			>.
		</p>
		<p>
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
			<img class="youtube" src="../../assets/images/training-5.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: "Grid",
	props: {
		altId: Boolean
	},
	data() {
		return {
			video: { id: '', altId: '', title: 'Creating a grid' }
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