<template>
	<div>
		<h1>Web services</h1>
		<p>
			A tutorial on how to import data from web services for use in QGIS and UMEP is 
			provided in video format, focusing on using population density data.
		</p>
		<p>
			<iframe
				:src="setSrc(video.id, video.altId)"
				title="Importing from web services"
				:data-id="video.id"
				:data-alt-id="video.altId"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="video.id || video.altId"
			></iframe>
			<img class="youtube" src="../../assets/images/training-7.png" v-else />
		</p>
		<p>
			There is also
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/GettingData/UMEP10.html"
				target="_blank" rel="noopener noreferrer"
				class="nowrap"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				documentation on the UMEP workshop website</a
			>.
		</p>
		<p>
			<a
				href="https://umep-docs.readthedocs.io/projects/tutorial/en/latest/Tutorials/SuewsWUDAPT.html#population-density"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				An example of how to use population density data</a
			> is provided as part of the SUEWS work.
		</p>
	</div>
</template>

<script>
export default {
	name: "WebServices",
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

<style scoped>
</style>