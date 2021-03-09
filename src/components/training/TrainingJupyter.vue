<template>
	<div>
		<h1>Installing Jupyter Notebook</h1>
		<p>
			If you just want to install Jupyter Notebook as a standalone program, 
			please watch this tutorial on JWPlayer.
		</p>
		<p>
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
			<img class="youtube" src="../../assets/images/training-9.png" v-else />
		</p>
		<p>
			The basics of Jupyter Notebooks are covered in this tutorial and include:
			<ul>
				<li>Editing and saving a notebook</li>
				<li>Adding and running cells</li>
				<li>Edit/command mode</li>
				<li>Taking notes using Markdown</li>
			</ul>
		</p>
		<hr />
		<p>
			<strong>Jupyter Notebook extensions</strong> (optional, but recommended): 
		</p>
		<p>
			<a
				href="https://umep-workshop.readthedocs.io/en/latest/Jupyter/JN0.html#jupyter-notebook-extensions"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				Find out about extensions</a
			>
		</p>
		<p>
			<a
				href="https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html"
				target="_blank" rel="noopener noreferrer"
			>
				<font-awesome-icon icon="external-link-alt"></font-awesome-icon>
				How to install the extensions</a
			>
		</p>
		<hr />
		<p>
			These two tutorials on JWPlayer have advanced tips on using Jupyter Notebook:
		</p>
		<p v-for="(video, i) of basicsVideos" :key="i">
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
			<img class="youtube" :src="require(`../../assets/images/training-${video.img}.png`)" v-else />
		</p>
		<p>
			These two tutorials cover these key points:
			<ul>
				<li>Add cells above/below</li>
				<li>Stop/restart kernel</li>
				<li>Cut (delete) / copy / paste cells</li>
				<li>Merge/split cells</li>
				<li>Structuring your notebook</li>
				<li>Main storyline</li>
				<li>Scratch pad</li>
				<li>Note-taking in markdown</li>
				<li>Basics</li>
				<li>Equation</li>
				<li>Magic with line/cell-magic</li>
				<li>Terminal commands</li>
				<li>External modules (such as Fortran)</li>
			</ul>
		</p>
	</div>
</template>

<script>
export default {
	name: "Jupyter",
	props: {
		altId: Boolean
	},
	data() {
		return {
			video: { id: '', altId: '', title: 'Installing' },
			basicsVideos: [
				{ id: '', altId: '', title: 'First basics on using Jupyter Notebook', img: 10 },
				{ id: '', altId: '', title: 'Second basics on using Jupyter Notebook', img: 11 }				
			]
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