const path = require('path');

module.exports = {
	entry: {
		'global': './src/js/theme.js'
	},
	output: {
		path: path.join(__dirname, './dist/js/'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: path.join(__dirname),
				loader: 'babel-loader'
			}
		]
	}
};
