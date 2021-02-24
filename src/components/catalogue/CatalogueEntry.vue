<template>
	<div class="selected-entry">
		<div class="selected-page">
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'abstract' }"
				:disabled="!selectedId"
				@click="selectedPage = 'abstract'"
			>
				Abstract
			</div>
			<div
				class="selected-page-button"
				:class="{ selected: selectedPage == 'info' }"
				:disabled="!selectedId"
				@click="selectedPage = 'info'"
			>
				Information
			</div>
		</div>
		<div class="entry-details" v-if="!selectedEntry">
			No entry selected
		</div>
		<div class="entry-details" v-else-if="selectedPage == 'abstract'">
			<h2 class="title">{{ selectedEntry.title }}</h2>
			<p v-if="!selectedEntry.abstract">No abstract available</p>
			<p v-else-if="selectedEntry.htmlAbstract" v-html="selectedEntry.abstract"></p>
			<p v-else>{{ selectedEntry.abstract }}</p>
		</div>
		<div class="entry-details" v-else>
			<h2 class="title">{{ selectedEntry.title }}</h2>
			<table class="entry-table">
				<tr v-if="selectedEntry.actualType">
					<td class="field-label">Type</td>
					<td class="field-value">{{ selectedEntry.actualType }}</td>
				</tr>
				<tr v-if="selectedEntry.journal">
					<td class="field-label">Journal</td>
					<td class="field-value break-word">{{ selectedEntry.journal }}</td>
				</tr>
				<tr v-if="selectedEntry.volume">
					<td class="field-label">Volume</td>
					<td class="field-value">{{ selectedEntry.volume }}</td>
				</tr>
				<tr v-if="selectedEntry.issue">
					<td class="field-label">Issue</td>
					<td class="field-value">{{ selectedEntry.issue }}</td>
				</tr>
				<tr v-if="selectedEntry.pages">
					<td class="field-label">Pages</td>
					<td class="field-value">{{ selectedEntry.pages }}</td>
				</tr>
				<tr class="row-hover" v-if="selectedEntry.doi">
					<td class="field-label clickable">
						<a :href="`https://doi.org/${selectedEntry.doi}`" target="_blank" rel="noopener noreferrer" class="nowrap">
							DOI
							<font-awesome-icon icon="external-link-alt" class="link-icon"></font-awesome-icon>
						</a>
					</td>
					<td class="field-value">
						<a :href="`https://doi.org/${selectedEntry.doi}`" target="_blank" rel="noopener noreferrer">
							{{ selectedEntry.doi }}
						</a>
					</td>
				</tr>
				<tr v-if="selectedEntry.issn">
					<td class="field-label">ISSN</td>
					<td class="field-value">{{ selectedEntry.issn }}</td>
				</tr>
				<tr class="row-hover" v-if="selectedEntry.url">
					<td class="field-label clickable">
						<a :href="selectedEntry.url" target="_blank" rel="noopener noreferrer" class="nowrap">
							URL
							<font-awesome-icon icon="external-link-alt" class="link-icon"></font-awesome-icon>
						</a>
					</td>
					<td class="field-value">
						<a :href="selectedEntry.url" target="_blank" rel="noopener noreferrer">
							{{ selectedEntry.url }}
						</a>
					</td>
				</tr>
				<tr v-if="selectedEntry.publisher">
					<td class="field-label">Publisher</td>
					<td class="field-value break-word">{{ selectedEntry.publisher }}</td>
				</tr>
				<tr v-if="selectedEntry.editor">
					<td class="field-label">Editor(s)</td>
					<td class="field-value break-word">{{ selectedEntry.editor }}</td>
				</tr>
				<tr v-if="selectedEntry.notes">
					<td class="field-label">Notes</td>
					<td class="field-value break-word" v-if="selectedEntry.htmlNotes" v-html="selectedEntry.notes"></td>
					<td class="field-value break-word" v-else>{{ selectedEntry.notes }}</td>
				</tr>
				<tr v-if="selectedEntry.authors && selectedEntry.authors.length == 1">
					<td class="field-label">Author</td>
					<td class="field-value break-word">{{ selectedEntry.authors[0] }}</td>
				</tr>
				<tr v-if="selectedEntry.authors && selectedEntry.authors.length == 2">
					<td class="field-label">Authors</td>
					<td class="field-value break-word">
						{{ selectedEntry.authors[0] }} and <br/> 
						{{ selectedEntry.authors[1] }}
					</td>
				</tr>
				<tr 
					class="clickable row-hover"
					@click="showAllAuthors = !showAllAuthors"
					v-if="selectedEntry.authors && selectedEntry.authors.length > 2"
				>
					<td class="field-label nowrap">
						Authors
						<font-awesome-icon 
							:icon="!showAllAuthors ? 'expand-arrows-alt' : 'compress-arrows-alt'" 
							class="collapse-icon" 
						></font-awesome-icon>
					</td>
					<td class="field-value break-word" v-if="showAllAuthors">
						<span v-for="(author, i) in selectedEntry.authors" :key="`author-${i}`">
							<br v-if="i > 0" />{{ author }}
						</span>
					</td>
					<td class="field-value break-word" v-else>
						{{ selectedEntry.authors[0] }} and 
						{{ selectedEntry.authors.length - 1 }} others
					</td>
				</tr>
				<tr>
					<td class="field-label">
						Keywords 
					</td>
					<td class="field-value" v-if="selectedEntry.keywords.length == 0">
						None 
					</td>
					<td class="keywords flex-row" v-else>
						<div 
							v-for="(tag, i) in selectedEntry.keywords" 
							:key="`tag-${i}`" 
							class="keyword"
							:class="{ 
								'in-filter': tagInFilter(tag), 
								'in-taglist': tagInList(tag)
							}"
						>
							{{ tag }}
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CatalogueEntry',
	props: {
		selectedId: String,
		selectedEntry: Object,
		tagList: Array,
		filterSettings: Object
	},
	data() {
		return {
			selectedPage: 'abstract',
			showAllAuthors: false
		}
	},
	watch: {
		selectedEntry() {
			this.showAllAuthors = false
			this.$nextTick(() => {
				if (typeof this.$el.scrollTo == 'function') {
					this.$el.scrollTo({ top: 0, behavior: 'smooth'})
				} else {
					this.$el.scrollTop = 0
				}
			})
		}
	},
	methods: {
		tagInFilter(tag) {
			return this.filterSettings.themes && this.filterSettings.themes.includes(tag.toUpperCase())
		},
		tagInList(tag) {
			return this.tagList.map(a => a.toUpperCase()).includes(tag.toUpperCase())
		}
	}
}
</script>

<style scoped>
.selected-entry {
	width: var(--rightCatalogueWidth);
	height: var(--catalogueHeight);
	overflow-x: hidden;
	overflow-y: scroll;
}

.selected-page {
	border: 2px solid var(--vpCoolGrey);
	padding: 0.5px 0; /* to match table header height */
	position: sticky;
	top: 0;
	z-index: 10;
	display: flex;
	flex-direction: row;
	background: var(--vpDark);
}

.selected-page-button {
	padding: 8px 16px;
	background: transparent;
	color: var(--whiteDisabled);
}

.selected-page-button.selected {
	color: var(--whiteDefault);
}

.selected-page-button:not(disabled):not(.selected):hover {
	color: var(--whiteHover);
}

.selected-page-button:not(disabled) {
	cursor: pointer;
}

.entry-details {
	padding: 8px 16px;
}

h2.title {
	color: var(--vpDark);
}

td.field-label,
td.field-label a {
	font-size: 14px;
	opacity: 0.75;
	padding: 4px 4px 2px 0;
	text-align: right;
	vertical-align: top;
}

td.field-value {
	padding: 2px 24px 2px 4px;
	word-break: break-all;
}
td.field-value.break-word {
	word-break: break-word;
}

tr.row-hover td,
tr.row-hover td a,
tr.row-hover td span {
	text-decoration: none !important;
}
tr.row-hover:hover td,
tr.row-hover:hover td a,
tr.row-hover:hover td span {
	text-decoration: none !important;
	color: var(--vpOrange);
}
tr.row-hover:hover td a path,
tr.row-hover:hover td path {
	color: var(--vpOrange);
}

.fa-expand-arrows-alt {
	width: 14px;
}

td.flex-row {
	margin-top: 2px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;	
	flex-wrap: wrap;
}

.keyword {
	margin: 0 8px 2px 0;
	padding: 2px 4px;
	background: var(--primaryLighter);
	border-radius: 5px;
	white-space: nowrap;
	word-break: break-all;
	font-size: 14px;
}
/*.keyword.in-taglist {
	background: var(--primaryDisabled);
}*/
.keyword.in-filter {
	background: var(--vpPeach);
}

@media (max-width: 1007px) {
	td.field-label,
	td.field-label a,
	.keyword {
		font-size: var(--fontSizeMedium);
	}
	.entry-details {
		padding: 4px 8px;
	}
}
@media (max-width: 640px) {
	td.field-label,
	td.field-label a,
	.keyword {
		font-size: var(--fontSizeSmall);
	}
	.entry-details {
		height: 100%;
		overflow-x: auto;
	}
}
</style>
