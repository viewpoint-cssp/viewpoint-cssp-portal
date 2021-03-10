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
				:src="`https://cdn.jwplayer.com/players/${video.id}-NocosEfA.html`"
				:title="video.title"
				:data-id="video.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="video.id"
			></iframe>
			<img class="youtube" src="../../assets/images/training-5.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: "Grid",
	data() {
		return {
			video: { id: '', tite: 'Creating a grid' }
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
</style>