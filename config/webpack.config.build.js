let webpack = require("webpack");
let webpackMerge = require("webpack-merge");

let webpackBase = require("./webpack.config.base.js");


// 合并配置文件
module.exports = webpackMerge(webpackBase, {
    // plugins: [
    //     // 代码压缩
    //     new webpack.optimize.UglifyJsPlugin({
    //         // 开启 sourceMap
    //         sourceMap: true
    //     }),
    //     // 提取公共 JavaScript 代码
    //     new webpack.optimize.CommonsChunkPlugin({
    //         // chunk 名为 commons
    //         name: "commons",
    //         filename: "[name].bundle.js",
    //     }),
    // ]
});