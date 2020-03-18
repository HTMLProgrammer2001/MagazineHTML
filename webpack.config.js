const path = require('path');
const webpack = require('webpack');

let conf = {
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, './dist')
	},
	module: {
		rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            }
		]
	},
  	plugins: [
  		new webpack.ProvidePlugin({
			$: 'jquery',
			React: 'react',
			ReactDOM: 'react-dom'
		})
  	],

	resolve: {
		alias: {
			pages: path.resolve(__dirname, 'src/pages/'),
			scss: path.resolve(__dirname, 'src/scss/'),
			js: path.resolve(__dirname, 'src/js/'),
			css: path.resolve(__dirname, 'src/css/'),
			assets: path.resolve(__dirname, 'src/assets/'),
			modules: path.resolve(__dirname, 'node_modules')
		}
	}
};


module.exports = (env, options) => {
	let mode = options.mode === 'production';

	conf.devtool = mode ? false : 'source-map';

	return conf;
};