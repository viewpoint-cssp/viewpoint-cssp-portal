<template>
	<div>
		<Banner class="banner-style" enTitle="Glossary"></Banner>
		<div class="about-page">
			<div class="bilingual">
				<p>
					This glossary provides suggested translations of climate
					science terms from English to Mandarin. These terms have
					been collected and reviewed by climate scientists working in
					the UK and China.
				</p>
				<p lang="zh-cn">
					本术语表提供了气候科学术语英文至中文（普通话）的建议翻译。这些术语已由在英国和中国工作的气候科学家们收集并审阅。
				</p>
			</div>
			<div class="bilingual">
				<p>
					The climate science terms in this glossary are those which
					are commonly misunderstood by non-scientists or those which
					have been difficult to translate into Mandarin from
					experience in CSSP China.
				</p>
				<p lang="zh-cn">
					本术语表中的气候科学术语是那些通常被非专业人士误解的术语，或者是那些根据“气候科学支持服务伙伴关系中国项目
					(CSSP China)”的经验很难翻译为普通话的术语。
				</p>
			</div>
			<div class="bilingual">
				<p>
					We hope this glossary will be useful for those looking for
					accurate English-Mandarin climate science translations. The
					glossary can also be printed and used as a quick guide for
					translators. It is important to note the language used in
					climate science is constantly evolving and the precise
					definition could change in the future.
				</p>
				<p lang="zh-cn">
					我们希望本术语表对那些寻求准确地在气候科学方面进行英文-中文（普通话）的翻译的人员有所帮助。本术语表也可以打印，并用作翻译人员的快速指南。值得注意的是，气候科学中使用的语言正在不断发展，即使是精确的定义也可能会在将来改变。
				</p>
			</div>
			<div class="bilingual">
				<p>
					If you have any additional suggestions for terms on this
					list, please contact:
					<a
						href="mailto:jennifer.weeks@metoffice.gov.uk?subject='VIEWpoint glossary'"
						>WCSSPProgrammeOffice@metoffice.gov.uk</a
					>.
				</p>
				<p lang="zh-cn">
					如果您对本列表中的术语有其他建议，请联系：
					<a
						href="mailto:jennifer.weeks@metoffice.gov.uk?subject='VIEWpoint glossary'"
						>WCSSPProgrammeOffice@metoffice.gov.uk</a
					>。
				</p>
			</div>
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
					<td class="glossary-comments" lang="zh-cn">
						<div
							class="glossary-comments suppressed"
							v-if="definition.comments && suppressComments"
						>
							See original spreadsheet
						</div>
						<div
							class="glossary-comments html"
							lang="zh-cn"
							v-else-if="definition.htmlComments"
							v-html="definition.comments"
						></div>
						<div class="glossary-comments" lang="zh-cn" v-else>
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
						<div v-if="definition.enDesc">
							{{ definition.enDesc }}
						</div>
						<div v-if="definition.cnText" lang="zh-cn">
							{{ definition.cnText }}
						</div>
						<div v-if="definition.cnDesc" lang="zh-cn">
							{{ definition.cnDesc }}
						</div>
						<div
							class="glossary-comments suppressed"
							v-if="definition.comments && suppressComments"
						>
							See original spreadsheet
						</div>
						<div
							class="glossary-comments html"
							lang="zh-cn"
							v-else-if="definition.htmlComments"
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
			<div class="bilingual">
				<h3>Acknowledgements</h3>
				<h3 lang="zh-cn">致谢</h3>
			</div>
			<div class="bilingual">
				<p>
					We would like to thank all scientists involved in CSSP China
					who contributed to the list. We would also like to thank Ms.
					Zheng Lin (IAP), Prof. Yinlong Xu (CAAS) and Dr. Lei Huang
					(CMA) for proofreading these terms.
				</p>
				<p lang="zh-cn">
					我们要感谢所有参与“气候科学支持服务伙伴关系中国项目”的人员，他们为术语表中的术语列表做出了巨大贡献。我们还要感谢郑琳（音译）女士（中国科学院大气物理研究所，IAP）、徐银龙（音译）教授（中国农业科学院，CAAS）和黄磊（音译）博士（中国气象局，CMA）对这些术语的校对。
				</p>
			</div>
		</div>
		<Gotop></Gotop>
	</div>
</template>

<script>
import csvRaw from 'raw-loader!../../public/glossary.csv' // in public for ease of maintenance
import Banner from './Banner.vue'
import Gotop from './Gotop.vue'

const iconSvg = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-external-link-alt fa-w-16"><path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" class=""></path></svg>`

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
			narrowPage: false,
			suppressComments: true
		}
	},
	methods: {
		resized() {
			// recalculate --glossaryCommentsWidth based on window innerWidth
			// less table buffers and borders since table may not return
			// correct width when this is done (even after $nextTick)
			let buffer = 64
			const table = document.getElementsByTagName('table')
			if (table.length) {
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
			// and set table margins to auto for centering
			table[0].classList.add('center')
		}
	},
	created() {
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
				// "s can be left at the end of comments so this tidies that up
				this.glossary
					.filter(a => a.comments && a.comments.indexOf(','))
					.map(a => {
						if (a.comments.substr(0, 1) == '"') {
							a.comments = a.comments.slice(1)
						}
						if (
							a.comments.substr(a.comments.length - 1, 1) == '"'
						) {
							a.comments = a.comments.slice(
								0,
								a.comments.length - 1
							)
						}
					})
				// tweaks to comments to add anchors to URLs
				this.glossary
					.filter(
						a =>
							a.comments &&
							(a.comments.indexOf('\n') >= 0 ||
								a.comments.indexOf('http') >= 0)
					)
					.map(a => {
						const lines = a.comments.replace(/\r/g, '').split('\n')
						for (let x = 0; x < lines.length; x++) {
							if (lines[x] && a.comments.indexOf('http') >= 0) {
								const parts = lines[x].split(' ')
								for (let i = 0; i < parts.length; i++) {
									if (parts[i].indexOf('http') == 0) {
										const url = parts[i]
										const aAttrib =
											'target="_blank" rel="noopener noreferrer"'
										parts[
											i
										] = `<a href="${url}" ${aAttrib}>${iconSvg} ${url}</a>`
										if (i > 0) {
											parts[i] = '<br>' + parts[i]
										}
									}
								}
								lines[x] = parts.join(' ')
							}
						}
						// drop any trailing blank lines
						while (
							lines.length > 0 &&
							(!lines[lines.length - 1] ||
								lines[lines.length - 1] == '"')
						) {
							lines.pop()
						}
						// and re-join with <br>s
						a.comments = lines.join('<hr>').replace(/<hr><hr>/g, '<hr>')
						a.htmlComments = true
					})
			})
	},
	mounted() {
		this.$el.parentElement.scrollIntoView(true)
		this.resized() // immediately set size-based CSS var immediately on loading
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
div.glossary-comments hr {
	border: none;
	border-top: 1px dotted var(--text); 
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

.about-page:not(.attrib) {
	padding-bottom: 12px;
}
.about-page.attrib {
	padding-top: 12px;
}

table {
	max-width: min(calc(100% - 24px), 1230px);
	margin: 12px 64px;
}

table.center {
	margin-left: auto;
	margin-right: auto;
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

div.glossary-comments.suppressed {
	font-size: 0.9rem;
	font-style: italic;
	opacity: 0.5;
}

td {
	padding: 8px 16px;
	vertical-align: top;
	background: transparent;
}

td.text {
	font-weight: 600;
}

.glossary-comments {
	font-size: 0.9rem;
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
	.about-page:not(.attrib) {
		padding-bottom: 8px;
	}
	.about-page.attrib {
		padding-top: 8px;
	}
	table {
		margin: 8px 24px;
	}
	th,
	td {
		padding: 4px 8px;
	}
}

@media (max-width: 640px) {
	.about-page:not(.attrib) {
		padding-bottom: 4px;
	}
	.about-page.attrib {
		padding-top: 4px;
	}
	table {
		margin: 4px 8px;
	}
	th,
	td {
		padding: 2px 4px;
	}
}

@media print {
	.about-page:not(.attrib),
	.gotop-button {
		display: none !important;
	}
	.about-page.attrib {
		display: flex;
		flex-direction: row;
	}
	.about-page.attrib * {
		font-size: 0.6rem;
		margin: 0;
	}
	.about-page.attrib .bilingual {
		display: inline-block;
	}
	.about-page.attrib .bilingual h3 {
		width: auto;
		margin-right: 8px;
	}
	.about-page.attrib .bilingual p {
		width: auto;
	}
	table {
		margin: 8px 12px;
	}
	thead,
	tr {
		border: 2px solid var(--vpDark);
	}
	th,
	td {
		padding: 4px 8px;
		font-size: 0.8rem;
		border-right: 1px solid var(--vpDarkImage) !important;
	}
	td:last-of-type {
		border-right: none;
	}
	div.glossary-comments {
		width: 150px;
		font-size: 0.7rem;
	}
}
</style>
