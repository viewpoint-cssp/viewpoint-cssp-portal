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
				:src="`https://cdn.jwplayer.com/players/${qgisVideo.id}-NocosEfA.html`"
				:title="qgisVideo.title"
				:data-id="qgisVideo.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
			></iframe>
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
				:src="`https://cdn.jwplayer.com/players/${umepVideo.id}-NocosEfA.html`"
				:title="umepVideo.title"
				:data-id="umepVideo.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
			></iframe>
		</p>
	</div>
</template>

<script>
export default {
	name: "QGIS",
	data() {
		return {
			qgisVideo: { id: 'EkZ6nfXN', tite: 'Installing QGIS' },
			umepVideo: { id: 'le4aE0n3', tite: 'Installing UMEP' }
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
</style>