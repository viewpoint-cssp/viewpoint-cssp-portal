<template>
	<div>
		<h1>Installing Jupyter Notebook</h1>
		<p>
			If you just want to install Jupyter Notebook as a standalone program, 
			please watch this tutorial on YouTube.
			<a
				href="https://www.youtube.com/watch?v=bvZOOYZ0QOU&amp;list=PLShSKbdF7w3339RUz3_5RtYwYOWuYfOzy&amp;index=9"
				target="_blank" rel="noopener noreferrer"
			>
				<img class="youtube" src="../../assets/images/training-9.png" />
			</a>
			<!--<iframe 
				src="https://www.youtube.com/embed/bvZOOYZ0QOU?rel=0" 
				allowfullscreen="" 
				width="100%" 
				height="350" 
				frameborder="0"
				v-else
			></iframe>-->
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
			Jupyter Notebook extensions (optional, but recommended): 
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
			These two tutorials on YouTube have advanced tips on using Jupyter Notebook:
		</p>
		<p class="flex-wrapper">
			<a
				href="https://www.youtube.com/watch?v=FZ1aNbH178Y&amp;list=PLShSKbdF7w3339RUz3_5RtYwYOWuYfOzy&amp;index=10"
				target="_blank" rel="noopener noreferrer"
				alt="First basics on using Jupyter Notebook"
			>
				<img class="youtube" src="../../assets/images/training-10.png" />
			</a>
			<a
				href="https://www.youtube.com/watch?v=Ts5DC5-5xVw&amp;list=PLShSKbdF7w3339RUz3_5RtYwYOWuYfOzy&amp;index=11"
				target="_blank" rel="noopener noreferrer"
				alt="Second basics on using Jupyter Notebook"
			>
				<img class="youtube" src="../../assets/images/training-11.png" />
			</a>
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
	name: "Jupyter"
}
</script>

<style scoped>
.flex-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
}
</style>