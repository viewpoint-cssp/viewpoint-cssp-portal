const path = require('path')
const webpack = require('webpack')

module.exports = {
	pages: {
		main: {
			entry: 'src/main.js',
			template: 'public/index.html',
			filename: 'index.html'
		}
	},
	configureWebpack: {
		plugins: [
			new webpack.ContextReplacementPlugin(
				/moment[/\\]locale$/,
				/en-gb|uk|es/
			)
		]
	},
	lintOnSave: true,
	publicPath:
		process.env.NODE_ENV === 'production' ? '/viewpoint-cssp-portal/' : '/'
}
