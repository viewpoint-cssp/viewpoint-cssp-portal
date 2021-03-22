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
				:src="`https://cdn.jwplayer.com/players/${video.id}-NocosEfA.html`"
				:title="video.title"
				:data-id="video.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
			></iframe>
		</p>
	</div>
</template>

<script>
export default {
	name: 'Basics',
	data() {
		return {
			video: { id: 'vVUL53bw', tite: 'Basics' }
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped></style>
