<template>
	<div>
		<h1>Web services</h1>
		<p>
			A tutorial on how to import data from web services for use in QGIS and UMEP is 
			provided in video format, focusing on using population density data.
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
	data() {
		return {
			video: { id: '', tite: 'Importing from web services' }
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
</style>