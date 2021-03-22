<template>
	<div>
		<h1>Installing Anaconda and Jupyter Notebook</h1>
		<p>
			If you want to install a Python package manager and Jupyter notebook
			please watch these tutorials.
		</p>
		<p v-for="(video, i) of videos" :key="i">
			<iframe
				:src="`https://cdn.jwplayer.com/players/${video.id}-NocosEfA.html`"
				:title="video.title"
				:data-id="video.id"
				frameborder="0"
				scrolling="auto"
				allowfullscreen
			></iframe>
		</p>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/Jupyter/PY0.html"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Background information on Python and Juypter Notebooks </a
			> can be found on the UMEP website alongside a few basic Python tutorials.
		</p>
	</div>
</template>

<script>
export default {
	name: 'Anacoda',
	data() {
		return {
			videos: [
				{ id: 'AjMHr6w1', tite: 'Downloading Anaconda3', img: 12 },
				{ id: '0icUhUNm', tite: 'Installing Anaconda3', img: 13 },
				{ id: 'zIy3aTMJ', tite: 'Launching Jupyter Notebook', img: 14 }
			]
		}
	},
	mounted() {
		this.$emit('resizePlayer')
	}
}
</script>

<style scoped>
</style>
