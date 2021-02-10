<template>
	<div>
		<Banner class="banner-style" enTitle="Glossary"></Banner>
		<table>
			<tr v-for="(definition, i) in glossary" :key="i">
				<td class="text english" :class="{ header: !i }">
					{{ definition.enText }}
				</td>
				<td class="desc english" :class="{ header: !i }">
					{{ definition.enDesc }}
				</td>
				<td class="text mandarin" :class="{ header: !i }" lang="zh-cn">
					{{ definition.cnText }}
				</td>
				<td class="desc mandarin" :class="{ header: !i }" lang="zh-cn">
					{{ definition.cnDesc }}
				</td>
				<td class="comments" :class="{ header: !i }" lang="zh-cn">
					<font-awesome-icon
						icon="comment"
						v-if="definition.comments"
						:title="i ? definition.comments : ''"
					></font-awesome-icon>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import csvRaw from 'raw-loader!../../public/glossary.csv' // in public for ease of maintenance
import Banner from './Banner.vue'

export default {
	name: 'Glossary',
	components: {
		Banner
	},
	data() {
		return {
			glossary: []
		}
	},
	methods: {},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		const csv = require('csvtojson')
		csv()
			.fromString(`enText,enDesc,cnText,cnDesc,comments\n${csvRaw}`)
			.then(jsonObj => {
				const firstText = jsonObj[0].enText // 'English'
				this.glossary = jsonObj.sort((a, b) => {
					if (a.enText == firstText) { // title always at the top
						return -1
					} else if (!a.enText) { // blank ones always at the bottom
						return 1
					} else if (a.enText.toUpperCase() < b.enText.toUpperCase()) {
						return -1
					} else if (a.enText.toUpperCase() > b.enText.toUpperCase()) {
						return 1
					}
					return 0
				})
				if (this.glossary[0].enText != firstText) {
					// The above works to keep the title row at the top for FF but not Chrome or Edge
					let i = 0
					for (i = 1; i < this.glossary.length; i++) {
						if (this.glossary[i].enText == firstText) {
							break
						}
					}
					if (i && i < this.glossary.length) {
						const firstObj = this.glossary[i]
						this.glossary.splice(i, 1)
						this.glossary.splice(0, 0, firstObj)
					}
				}
			})
	}
}
</script>

<style scoped>
.banner-style {
	background-image: url('../assets/images/resources.jpg');
	background-blend-mode: soft-light;
}
@supports (-ms-ime-align: auto) {
	/* EdgeHTML since background-blend-style doesn't work, use a white box 'shadow' to lighten */
	.banner-style {
		box-shadow: inset 0 0 0 1000px rgba(255, 255, 255, 0.8);
	}
}

table {
	margin: 12px 64px;
}

tr:nth-of-type(even) {
	background: var(--primaryLightest);
}
tr:nth-of-type(odd) td {
	border-color: var(--primaryLightest);
}

td {
	padding: 8px 16px;
	vertical-align: top;
	background: transparent;
}

td.header {
	background: var(--vpDark);
	color: var(--vpPeach);
	font-weight: bold;
	vertical-align: middle;
}
td.header.comments svg path {
	color: var(--vpPeach);
}

td.comments svg {
	background: transparent;
}
</style>
