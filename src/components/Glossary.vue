<template>
	<div>
		<Banner class="banner-style" enTitle="Glossary"></Banner>
		<div class="about-page">
			<h2>About the glossary of terms</h2>
			<hr />
			<p>
				TODO: Some description about the glossary.
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<table v-if="!narrowPage">
			<thead>
				<th class="text english">
					{{ header.enText }}
				</th>
				<th class="desc english">
					{{ header.enDesc }}
				</th>
				<th class="text mandarin" lang="zh-cn">
					{{ header.cnText }}
				</th>
				<th class="desc mandarin" lang="zh-cn">
					{{ header.cnDesc }}
				</th>
				<th class="glossary-comments" lang="zh-cn">
					{{ header.comments }}
				</th>
			</thead>
			<tbody>
				<tr v-for="(definition, i) in glossary" :key="i">
					<td class="text english">
						{{ definition.enText }}
					</td>
					<td class="desc english">
						{{ definition.enDesc }}
					</td>
					<td class="text mandarin" lang="zh-cn">
						{{ definition.cnText }}
					</td>
					<td class="desc mandarin" lang="zh-cn">
						{{ definition.cnDesc }}
					</td>
					<td
						class="glossary-comments"
						lang="zh-cn"
					>
						<div 
							class="glossary-comments"
							lang="zh-cn"
							v-if="
								definition.comments &&
									definition.comments.indexOf('href=') > 0
							"
							v-html="definition.comments"
						></div>
						<div
							class="glossary-comments"
							lang="zh-cn"
							v-else
						>
							{{ definition.comments }}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<table v-else>
			<thead>
				<th class="text english">
					{{ header.enText }}
				</th>
				<th class="narrow">
					<!--<div>{{ header.enDesc }}</div>
					<div lang="zh-cn">{{ header.cnText }}</div>
					<div lang="zh-cn">{{ header.cnDesc }}</div>
					<div lang="zh-cn">{{ header.comments }}</div>-->
					<div>Definition, Translation and Comments</div>
				</th>
			</thead>
			<tbody>
				<tr v-for="(definition, i) in glossary" :key="i">
					<td class="text english">
						{{ definition.enText }}
					</td>
					<td class="narrow">
						<div v-if="definition.enDesc">{{ definition.enDesc }}</div>
						<div v-if="definition.cnText" lang="zh-cn">{{ definition.cnText }}</div>
						<div v-if="definition.cnDesc" lang="zh-cn">{{ definition.cnDesc }}</div>
						<div 
							class="glossary-comments"
							lang="zh-cn"
							v-if="
								definition.comments &&
									definition.comments.indexOf('href=') > 0
							"
							v-html="definition.comments"
						></div>
						<div
							class="glossary-comments"
							lang="zh-cn"
							v-else-if="definition.comments"
						>
							{{ definition.comments }}
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="about-page attrib">
			<p>
				TODO: Thank you to...
			</p>
			<p lang="zh-cn">TODO: Mandarin here?</p>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import csvRaw from 'raw-loader!../../public/glossary.csv' // in public for ease of maintenance
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

const iconSvg = `<svg data-v-02bc602e="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-external-link-alt fa-w-16"><path data-v-02bc602e="" fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" class=""></path></svg>`

export default {
	name: 'Glossary',
	components: {
		Banner,
		Gotop
	},
	data() {
		return {
			header: {},
			glossary: [],
			narrowPage: false
		}
	},
	methods: {
		resized() {
			// recalculate --glossaryCommentsWidth based on window innerWidth 
			// less table buffers and borders since table may not return
			// correct width when this is done (even after $nextTick)
			let buffer = 64
			const table = document.getElementsByTagName('table')
			if (table) {
				buffer = table[0].getBoundingClientRect().x
			}
			let tableWidth = window.innerWidth - (2 * (buffer + 1))
			document.documentElement.style.setProperty(
				'--glossaryCommentsWidth',
				`${Math.ceil(tableWidth * 0.2)}px`
			)
			// randomly decide at 720px whether to toggle to the narrow table layout
			if (tableWidth < 720) {
				this.narrowPage = true
			} else {
				this.narrowPage = false
			}

		}
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		const csv = require('csvtojson')
		csv()
			.fromString(`enText,enDesc,cnText,cnDesc,comments\n${csvRaw}`)
			.then(jsonObj => {
				const firstText = jsonObj[0].enText // 'English'
				this.glossary = jsonObj.sort((a, b) => {
					if (a.enText == firstText) {
						// title always at the top
						return -1
					} else if (!a.enText) {
						// blank ones always at the bottom
						return 1
					} else if (
						a.enText.toUpperCase() < b.enText.toUpperCase()
					) {
						return -1
					} else if (
						a.enText.toUpperCase() > b.enText.toUpperCase()
					) {
						return 1
					}
					return 0
				})
				if (this.glossary[0].enText != firstText) {
					// The above sort logic works to keep the title row 
					// at the top for FF but not Chrome or Edge
					let i = 0
					for (i = 1; i < this.glossary.length; i++) {
						if (this.glossary[i].enText == firstText) {
							break
						}
					}
					if (i && i < this.glossary.length) {
						// Just strip the header out the top and save it separately
						this.header = this.glossary[i]
						this.glossary.splice(i, 1)
					}
				} else {
					// Strip the header off the top and save it separately
					this.header = this.glossary[0]
					this.glossary.splice(0, 1)
				}
				this.glossary
					.filter(a => {
						return a.comments && a.comments.indexOf('http') >= 0
					})
					.map(a => {
						const parts = a.comments.split(' ')
						for (let i = 0; i < parts.length; i++) {
							if (parts[i].indexOf('http') == 0) {
								const url = parts[i]
								const aAttrib = 'target="_blank" rel="noopener noreferrer"'
								parts[i] = `<a href="${url}" ${aAttrib}>${iconSvg} ${url}</a>`
							}
						}
						a.comments = parts.join(' ')
					})
			})
		this.resized() /* set size-based CSS var immediately on loading */
		window.addEventListener('resize', this.resized)
		window.addEventListener('orientationchange', this.resized)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resized)
		window.removeEventListener('orientationchange', this.resized)
	}
}
</script>

<style>
/* these have to be global since in v-html! */
div.glossary-comments a,
div.glossary-comments a svg {
	background: transparent;
	color: inherit;
	font-size: inherit;
	text-decoration: none;
	word-break: break-word;
}
div.glossary-comments svg {
	width: 18px;
}
div.glossary-comments a:focus {
	outline: none;
}
div.glossary-comments a:hover,
div.glossary-comments a:hover svg path {
	color: var(--vpOrange);
}
@media print {
	div.glossary-comments svg {
		display: none;
	}
}
</style>

<style scoped>
.banner-style {
	background-image: url('../assets/images/glossary.jpg');
	background-position: bottom;
	box-shadow: inset 0 0 0 1000px rgba(217, 216, 214, 0.5);
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

th {
	background: var(--vpDark);
	color: var(--vpPeach);
	font-weight: bold;
	padding: 8px 16px;
	vertical-align: middle;
	text-align: left;
}

th.desc {
	min-width: 25%;
}

div.glossary-comments {
	width: var(--glossaryCommentsWidth);
	background: transparent;
}

td {
	padding: 8px 16px;
	vertical-align: top;
	background: transparent;
}

td.text {
	font-weight: 600;
}

.attrib p {
	font-size: 0.9rem;
}

.narrow div {
	background: transparent;
	width: 100%;
	padding: 2px 0;
	border-bottom: 1px solid var(--vpPeach);
}
.narrow div:last-child {
	border-bottom: none;
}

th.narrow div {
	color: var(--vpPeach);
}

@media (max-width: 1007px) {
	table {
		margin: 8px 24px;
	}
	th, 
	td {
		padding: 4px 8px;
	}
}

@media (max-width: 640px) {
	table {
		margin: 4px 8px;
	}
	th, 
	td {
		padding: 2px 4px;
	}
}

@media print {
	.about-page {
		display: none !important;
	}
	table {
		margin: 8px 12px;
	}
	th,
	td {
		padding: 4px 8px;
		font-size: 0.8rem;
	}
}
</style>
