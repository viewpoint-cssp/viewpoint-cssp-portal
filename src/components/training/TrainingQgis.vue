<template>
	<div>
		<h1>Installing QGIS and UMEP</h1>
		<h2>Installing QGIS</h2>
		<p>
			<a
				href="https://umep-docs.readthedocs.io/en/latest/Getting_Started.html#recommended-installation-of-qgis-on-windows"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				How to install onto Windows</a
			>
		</p>
		<p>
			<iframe
				:src="setSrc(qgisVideo.id, qgisVideo.altId)"
				title="Installing QGIS"
				:data-id="qgisVideo.id"
				:data-alt-id="qgisVideo.altId"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="qgisVideo.id || qgisVideo.altId"
			></iframe>
			<img class="youtube" src="../../assets/images/training-1.png" v-else />
		</p>
		<h2>Installing UMEP</h2>
		<p>
			<a
				href="https://umep-docs.readthedocs.io/en/latest/Getting_Started.html#installing-the-umep-plugin"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				How to install the UMEP plugin</a
			>.
		</p>
		<p>
			<iframe
				:src="setSrc(umepVideo.id, umepVideo.altId)"
				title="Installing QGIS"
				:data-id="umepVideo.id"
				:data-alt-id="umepVideo.altId"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
				v-if="umepVideo.id || umepVideo.altId"
			></iframe>
			<img class="youtube" src="../../assets/images/training-2.png" v-else />
		</p>
	</div>
</template>

<script>
export default {
	name: "QGIS",
	props: {
		altId: Boolean
	},
	data() {
		return {
			qgisVideo: { id: '', altId: '' },
			umepVideo: { id: '', altId: '' }
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