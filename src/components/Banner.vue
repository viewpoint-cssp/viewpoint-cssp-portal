<template>
	<div class="banner">
		<div class="content">
			<img
				id="logo"
				alt="VIEWpoint logo"
				src="../assets/images/logo.png"
			/>
			<div class="h1-wrapper">
				<h1 v-if="enTitle && cnTitle">
					{{ enTitle }}
					<br />
					{{ cnTitle }}
				</h1>
				<h1 v-else-if="enTitle">
					{{ enTitle }}
				</h1>
				<h1 v-else-if="cnTitle">
					{{ cnTitle }}
				</h1>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Banner',
	props: {
		enTitle: String,
		cnTitle: String
	}
}
</script>

<style scoped>
.banner {
	background-image: url('../assets/images/banner-fixed.jpg');
	background-attachment: scroll;
	background-size: 100%; /* just the width */
	background-position: center;
	background-blend-mode: luminosity;
	padding: 12px 64px;
}

.banner div {
	max-width: var(--widthLimit);
	background: transparent;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.banner div.content {
	margin: 0 auto;
}

.banner #logo {
	background: transparent;
	width: 50%;
	align-self: flex-end;
}

.banner div.h1-wrapper {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-start;
}
.h1-wrapper h1 {
	color: var(--vpOrange);
}
.h1-wrapper h1:lang(zh-cn) {
	text-align: right;
}

@media (max-width: 1007px) {
	.banner {
		padding: 8px 32px;
	}
}

@media (max-width: 792px) {
	.banner {
		padding: 8px 32px;
	}
}

@media print {
	.banner {
		background-image: none;
	}
	.banner div {
		flex-direction: row-reverse;
		align-items: flex-end;
	}
	.banner #logo {
		height: 80px;
		width: auto;
	}
	.banner div.h1-wrapper h1 {
		font-size: 2rem;
		margin: 0;
	}
}
</style>
