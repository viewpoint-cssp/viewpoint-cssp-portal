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
	chainWebpack: config => {
		config.module
			.rule('pdf')
			.test(/\.(pdf)(\?.*)?$/)
			.use('file-loader')
			.loader('file-loader')
			.options({
				name: 'assets/pdf/[name].[hash:8].[ext]'
			})
	},
	lintOnSave: true,
	publicPath:
		process.env.NODE_ENV === 'production' ? '/viewpoint-cssp-portal/' : '/'
}
