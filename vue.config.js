const webpack = require('webpack')
module.exports = {
	pages: {
		index: {
			// page 的入口
			entry: 'examples/main.js',
			// 模板来源
			template: 'public/index.html',
			// 输出文件名
			filename: 'index.html'
		}
	},
	devServer: {
		open: process.platform === "darwin",
		host: "0.0.0.0",
		port: 8002,
		https: false,
		hotOnly: false,
		// 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
		proxy: null // string | Object
	},
	configureWebpack: () => ({
		plugins: [
			new webpack.ProvidePlugin({
				jQuery: "jquery",
				$: "jquery"
			})
		]
	})
};
