'use strict';
const path = require('path');
const webpack = require('webpack');
//生成dll文件加快打包速度
module.exports = {
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
        'reactLib':['react','react-dom','react-router-dom'],
        'reduxLib':['react-redux','redux-thunk','redux-immutablejs'],
        'storeLib':['immutable'],
        // 'uiLib':['antd'],
        'chartLib':['echarts']
    },
	output: {
		path: path.join(__dirname, "dll"),
		filename: "[name].dll.js",
		library: "[name]_[hash]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dll", "[name]-manifest.json"),
			name: "[name]_[hash]",
            context: __dirname
		})
	]
};
