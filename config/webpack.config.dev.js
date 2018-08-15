let webpack = require('webpack');
let webpackMerge = require("webpack-merge");

let config = require("./config.js");
let webpackBase = require("./webpack.config.base.js");

module.exports = webpackMerge.smart(webpackBase, {
    mode: "development",
    output: {
        filename: "js/[name].bundle.js", //热更新就不用chunkhask了
    },
    devtool: "inline-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    // 配置 webpack-dev-server
    devServer: {
        contentBase: config.devServerOutputPath, // 项目根目录
        watchContentBase: true, //监控目录下的文件，默认false
        port: 6789,
        host: '0.0.0.0', //服务器外部可访问
        hot: true, //监控编译的文件
        overlay: {
            errors: true,
            warnings: true
        }
    }
});