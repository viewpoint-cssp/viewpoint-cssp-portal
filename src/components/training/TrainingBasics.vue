<template>
	<div>
		<h1>Basics of QGIS and UMEP</h1>
		<p>
			This covers the basics of QGIS: vector data and coordinates as well as an
			introduction to digital surface models (DSM) using data from the
			tutorial in the previous
			<span class="goto" @click="$emit('skipTo', 'TrainingFirstSteps')">
				<font-awesome-icon icon="backward"></font-awesome-icon>&nbsp;
				<strong>First Steps</strong></span
			> section.
			<iframe
				:src="setSrc(video.id, video.altId)"
				title="Basics"
				:data-id="video.id"
				:data-alt-id="video.altId"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="video.id || video.altId"
			></iframe>
			<img class="youtube" src="../../assets/images/training-4.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: 'Basics',
	props: {
		altId: Boolean
	},
	data() {
		return {
			video: { id: '', altId: '' }
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

<style scoped></style>
