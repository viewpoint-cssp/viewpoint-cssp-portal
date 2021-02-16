<template>
	<div class="catalogue">
		<div class="entries">
			<div class="cat-table-wrapper">
				<table class="cat-table">
					<tr class="header">
						<th
							:class="{ sort: sortBy == 'title' }"
							@click="sortTable('title')"
							width="64%"
						>
							<div class="column-header">
								Title
								<font-awesome-icon
									icon="caret-down"
									class="sort-icon"
									:class="sortDirection"
								></font-awesome-icon>
							</div>
						</th>
						<th
							:class="{ sort: sortBy == 'author' }"
							@click="sortTable('author')"
							width="26%"
						>
							<div class="column-header">
								Authors
								<font-awesome-icon
									icon="caret-down"
									class="sort-icon"
									:class="sortDirection"
								></font-awesome-icon>
							</div>
						</th>
						<th
							:class="{ sort: sortBy == 'year' }"
							@click="sortTable('year')"
							width="8%"
						>
							<div class="column-header">
								Year
								<font-awesome-icon
									icon="caret-down"
									class="sort-icon"
									:class="sortDirection"
								></font-awesome-icon>
							</div>
						</th>
					</tr>
					<tr v-if="sortedCatalogue.length == 0 && filterSettings">
						<td colspan="3" class="no-entries">
							No entries found
						</td>
					</tr>
					<tr v-else-if="sortedCatalogue.length == 0">
						<td colspan="3" class="no-entries">
							No entries loaded
						</td>
					</tr>
					<tr
						v-for="entry in sortedCatalogue"
						:id="`id-${entry.id}`"
						:key="entry.id"
						:class="{ selected: entry.id == selectedId }"
						@click="selectEntry(entry.id)"
						v-else
					>
						<td class="title">{{ entry.title }}</td>
						<td
							class="authors"
							v-if="!entry.authors || entry.authors.length == 0"
						></td>
						<td
							class="authors"
							v-else-if="entry.authors.length == 1"
						>
							{{ entry.authors[0] }}
						</td>
						<td
							class="authors"
							v-else-if="entry.authors.length == 2"
						>
							{{ entry.authors[0] }} and
							{{ entry.authors[1] }}
						</td>
						<td class="authors" v-else>
							{{ entry.authors[0] }}
							<span class="et-al">et al</span>
						</td>
						<td class="year">{{ entry.year }}</td>
					</tr>
				</table>
			</div>
			<transition name="fade" mode="out-in">
				<CatalogueFilter
					class="rh-panel"
					:tagList="tagList"
					:yearList="yearList"
					:filterSettings="filterSettings"
					:count="sortedCatalogue.length"
					v-if="showFilter"
					@close="$emit('filterClosed')"
					@setFilter="setFilter"
				></CatalogueFilter>
				<CatalogueEntry
					class="rh-panel"
					:selectedId="selectedId"
					:selectedEntry="selectedEntry"
					:tagList="tagList"
					:filterSettings="filterSettings"
					v-else
				></CatalogueEntry>
			</transition>
		</div>
	</div>
</template>

<script>
import jsonRaw from 'raw-loader!../../../public/catalogue.txt' // in public for ease of maintenance
import CatalogueEntry from './CatalogueEntry.vue'
import CatalogueFilter from './CatalogueFilter.vue'

export default {
	name: 'CatalogueContent',
	components: {
		CatalogueEntry,
		CatalogueFilter
	},
	props: {
		showFilter: Boolean
	},
	data() {
		return {
			catalogue: [],
			tagList: [
				'Surface temperature',
				'Precipitation and flooding',
				'Drought',
				'Water resources',
				'Cyclones and storms',
				'Urban challenges',
				'Cities',
				'Air quality',
				'Human health',
				'Extreme events',
				'Financial Services',
				'Agriculture and food security',
				'Long term risks',
				'Climate',
				'Climate change',
				'Supply chain',
				'Energy'
				//'Food security'
			],
			sortBy: 'year',
			sortDirection: 'desc',
			clickedId: null,
			filterSettings: {}
		}
	},
	computed: {
		sortedCatalogue() {
			let cat = [...this.catalogue]
			if (this.filterSettings.chars) {
				//const searchWords = this.filterSettings.chars.toUpperCase().split(' ')
				const searchParts = this.filterSettings.chars.match(
					/(?:[^\s"']+|['"][^'"]*["'])+/g
				) // splits into phrases if enclosed by single or double quotes and individual words
				const searchWords = searchParts.map(s =>
					s.toUpperCase().replace(/^["'](.+(?=["']$))["']$/, '$1')
				) // removes enclosing single and double quotes
				cat = cat.filter(c => {
					let foundWords = new Set()
					if (
						this.filterSettings.fields.includes('title') &&
						c.title
					) {
						for (let w = 0; w < searchWords.length; w++) {
							if (
								c.title.toUpperCase().indexOf(searchWords[w]) >=
								0
							) {
								foundWords.add(searchWords[w])
								if (this.filterSettings.matches == 'any') {
									return true
								}
							}
						}
					}
					if (
						this.filterSettings.fields.includes('abstract') &&
						c.abstract
					) {
						for (let w = 0; w < searchWords.length; w++) {
							if (
								c.abstract
									.toUpperCase()
									.indexOf(searchWords[w]) >= 0
							) {
								foundWords.add(searchWords[w])
								if (this.filterSettings.matches == 'any') {
									return true
								}
							}
						}
					}
					if (
						this.filterSettings.fields.includes('author') &&
						c.authors
					) {
						for (let w = 0; w < searchWords.length; w++) {
							for (let i = 0; i < c.authors.length; i++) {
								if (
									c.authors[i]
										.toUpperCase()
										.indexOf(searchWords[w]) >= 0
								) {
									foundWords.add(searchWords[w])
									if (this.filterSettings.matches == 'any') {
										return true
									}
								}
							}
						}
					}
					if (
						this.filterSettings.fields.includes('tags') &&
						c.keywords
					) {
						for (let w = 0; w < searchWords.length; w++) {
							for (let i = 0; i < c.keywords.length; i++) {
								if (
									c.keywords[i]
										.toUpperCase()
										.indexOf(searchWords[w]) >= 0
								) {
									foundWords.add(searchWords[w])
									if (this.filterSettings.matches == 'any') {
										return true
									}
								}
							}
						}
					}
					return foundWords.size == searchWords.length // since this.filterSettings.matches == 'all'!
				})
			}
			if (this.filterSettings.themes) {
				cat = cat.filter(c => {
					if (!c.keywords) return false
					const keyMatches = c.keywords.filter(k => {
						return this.filterSettings.themes.includes(
							k.toUpperCase()
						)
					})
					return keyMatches.length > 0
				})
			}
			if (this.filterSettings.years) {
				cat = cat.filter(c => {
					return c.year && this.filterSettings.years.includes(c.year)
				})
			}
			const sorted = cat.sort((a, b) => {
				if (this.sortBy !== 'title') {
					let aVal, bVal
					if (this.sortBy == 'author') {
						aVal =
							a.authors && a.authors.length > 0
								? a.authors[0].toUpperCase()
								: ''
						bVal =
							b.authors && b.authors.length > 0
								? b.authors[0].toUpperCase()
								: ''
					} else {
						aVal = a.year || 0
						bVal = b.year || 0
					}
					if (aVal < bVal) {
						return this.sortDirection == 'asc' ? -1 : 1
					}
					if (aVal > bVal) {
						return this.sortDirection == 'asc' ? 1 : -1
					}
				}
				if (a.title.toUpperCase() < b.title.toUpperCase()) {
					return this.sortDirection == 'asc' ||
						this.sortBy !== 'title'
						? -1
						: 1
				}
				if (a.title.toUpperCase() > b.title.toUpperCase()) {
					return this.sortDirection == 'asc' ||
						this.sortBy !== 'title'
						? 1
						: -1
				}
				return 0
			})
			this.$emit('updateCount', sorted.length)
			return sorted
		},
		yearList() {
			let years = new Set()
			this.catalogue.map(cat => {
				if (cat.year) {
					years.add(cat.year)
				}
			})
			return Array.from(years).sort()
		},
		selectedId() {
			if (this.clickedId) {
				return this.clickedId
			}
			if (this.sortedCatalogue.length > 0) {
				return this.sortedCatalogue[0].id
			}
			return null
		},
		selectedEntry() {
			if (this.selectedId) {
				return this.catalogue.filter(
					entry => entry.id == this.selectedId
				)[0]
			}
			return null
		}
	},
	watch: {
		sortedCatalogue() {
			if (this.clickedId) {
				if (
					this.sortedCatalogue.length == 0 ||
					this.sortedCatalogue.filter(a => a.id == this.clickedId)
						.length == 0
				) {
					this.clickedId = null
				}
			}
			if (this.sortedCatalogue.length == 0 && !this.showFilter) {
				this.$emit('filterOpen')
			}
			if (this.selectedId) {
				this.$nextTick(() => {
					this.scrollRowIntoView()
				})
			}
		},
		showFilter() {
			let el
			if (this.showFilter) {
				el = document.getElementsByClassName('settings')[0]
			}
			if (el) {
				el.scrollIntoView(false)
			}
		}
	},
	methods: {
		sortTable(order) {
			if (order == this.sortBy) {
				this.sortDirection =
					this.sortDirection == 'asc' ? 'desc' : 'asc'
			} else {
				this.sortBy = order
				this.sortDirection = 'asc'
			}
		},
		rhChanged(el) {
			// once the rh panel has toggled between the entry and the filter,
			// ensure its contents are scrolled to the top again
			el.scrollIntoView(true)
		},
		selectEntry(entry) {
			this.clickedId = entry
			if (this.showFilter) {
				// if clicked on an entry while the filter is open, close it!
				this.$emit('filterClosed')
			}
		},
		setFilter(newFilter) {
			this.filterSettings = newFilter
			//this.$emit('filterClosed') don't auto-close
		},
		scrollRowIntoView() {
			// scroll the row into view if required - by changing the table sort order or filter
			if (!this.selectedId) return
			const el = document.getElementById(`id-${this.selectedId}`)
			if (el) {
				if (typeof el.scrollIntoViewIfNeeded == 'function') {
					el.scrollIntoViewIfNeeded(false) // not FireFox or EdgeHTML - and not smooth behaviour!
				} else {
					const canScrollTo = typeof el.scrollTo == 'function' // Firefox = true, EdgeHTML = false
					const elBounds = el.getBoundingClientRect()
					const ctr = el.parentElement.parentElement // the scrollable div.cat-table-wrapper
					const ctrBounds = ctr.getBoundingClientRect()
					const offset = 41 // height of sticky header row
					if (elBounds.top < ctrBounds.top + offset) {
						if (canScrollTo) {
							ctr.scrollTo({
								top: el.offsetTop - offset,
								behavior: 'smooth'
							})
						} else {
							ctr.scrollTop = el.offsetTop - offset
						}
					}
					if (elBounds.bottom > ctrBounds.bottom) {
						if (canScrollTo) {
							el.scrollIntoView({
								behavior: 'smooth',
								block: 'end'
							})
						} else {
							// testing for scrollTo to pick up EdgeHTML
							el.scrollIntoView(false)
						}
					}
				}
			}
		}
	},
	mounted() {
		this.catalogue = JSON.parse(jsonRaw)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.entries {
	display: flex;
	flex-direction: row;
}

.cat-table-wrapper {
	width: var(--leftCatalogueWidth);
	height: var(--catalogueHeight);
	overflow-x: hidden;
	overflow-y: scroll;
}

.cat-table th {
	padding: 8px 16px;
	cursor: pointer;
	position: sticky;
	top: 2px;
	background: var(--vpDark);
	color: var(--whiteDisabled);
	font-weight: normal;
	text-align: left;
	vertical-align: center;
}
.cat-table th.sort {
	color: var(--whiteDefault);
}
.cat-table th:not(.sort):hover {
	color: var(--whiteHover);
}
.cat-table th.sort:hover {
	color: var(--vpOrange);
}
.cat-table th.sort:hover .fa-caret-down path {
	color: var(--vpOrange);
}

.column-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background: transparent;
	color: inherit;
}

.sort-icon {
	margin-left: 4px;
	background: transparent;
	color: transparent;
}
.sort-icon path {
	color: currentColor;
}
th.sort .sort-icon {
	color: var(--whiteDefault);
}
.sort-icon {
	transition: transform 0.2s linear;
}
.sort-icon.desc {
	transform: rotate(180deg);
}

.cat-table tr {
	vertical-align: top;
}

.cat-table tr:nth-of-type(even) td {
	background: var(--primaryLightest);
}
.cat-table tr:nth-of-type(odd) td {
	border-color: var(--primaryLightest);
}

.cat-table td {
	padding: 8px 16px;
	cursor: pointer;
}

.cat-table tr:hover td {
	background: var(--vpPeach);
	border-color: var(--vpCoolGrey);
}

.cat-table tr.selected td {
	background: var(--primaryDisabled);
	border-color: var(--vpCoolGrey);
}

.cat-table td.no-entries {
	text-align: center;
}

.cat-table tr:hover td.no-entries {
	background: var(--primaryLightest);
}

.et-al {
	font-style: italic;
	background: transparent;
}

.fade-enter-active {
	transition: all 0.5s ease-out;
}
.fade-leave-active {
	transition: all 0.3s ease-out;
}
.fade-enter,
.fade-leave-to {
	height: 0;
	opacity: 0;
}

@media (max-width: 640px) {
	img#logo {
		padding-left: 12px;
	}
	.cat-table th,
	.cat-table td {
		padding: 8px 4px;
	}
}
</style>
