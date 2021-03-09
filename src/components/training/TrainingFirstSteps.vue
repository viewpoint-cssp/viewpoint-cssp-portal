<template>
	<div>
		<h1>First steps with UMEP</h1>
		<p>
			The first step in your UMEP journey will be to apply a shadow casting model 
			in Gothenburg, Sweden to investigate daily shading patterns for pedestrians 
			and how solar access varies with seasons and through vegetation.
		</p>
		<p>
			<a
				href="https://umep-docs.readthedocs.io/projects/tutorial/en/latest/Tutorials/DailyShading.html#data-for-this-tutorial"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Data for this tutorial and detailed steps</a
			>.
		</p>
		<p>
			This follow-along video should take approximately 30 minutes.
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
			<img class="youtube" src="../../assets/images/training-3.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: "FirstSteps",
	props: {
		altId: Boolean
	},
	data() {
		return {
			video: { id: '', altId: '', title: 'First steps' }
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