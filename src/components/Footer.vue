<template>
	<footer>
		<p>
			Copyright &copy;
			<a href="https://www.the-iea.org">
				The Institute for Environmental Analytics</a
			>,
			<a href="https://www.reading.ac.uk">University of Reading</a>
			2021
		</p>
		<p>
			Contact:
			<a href="mailto:viewpoint@the-iea.org">viewpoint@the-iea.org</a>
		</p>
		<p>TODO: Logos of collaborating organisations here</p>
	</footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style scoped>
footer {
	width: 100%;
	background: var(--vpDark);
	border-top: 1px solid var(--vpOrange);
	padding: 16px 32px 16px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

footer * {
	background: transparent;
	color: var(--vpCoolGrey);
	font-size: 0.75rem;
}

footer a {
	text-decoration: none;
}
footer a:hover {
	color: var(--vpOrange);
}
</style>
