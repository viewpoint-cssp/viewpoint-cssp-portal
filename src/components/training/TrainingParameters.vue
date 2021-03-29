<template>
	<div>
		<h1>Morphological parameters</h1>
		<p>
			Morphological parameters: representing urban spatial structures using UMEP and QGIS.
		</p>
		<p>
			In this video you will learn how to:
			<ul>
				<li>
					Create parameters including roughness length and plan area index.
				</li>
				<li>
					Calculate and display the height to width ratio (H/W) using the 
					field calculator in the attributes table.
				</li>
			</ul>
		</p>
		<p>
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
	name: "Parameters",
	data() {
		return {
			video: { id: 'WklMaDMR', tite: 'Morphological parameters' }
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
</style>