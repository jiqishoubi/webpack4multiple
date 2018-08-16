let webpack = require("webpack");
let webpackMerge = require("webpack-merge");

let webpackBase = require("./webpack.config.base.js");


// 合并配置文件
module.exports = webpackMerge(webpackBase, {
    mode: "production",
    devtool: "cheap-module-source-map",
    //优化
    optimization: {
        //分离js类库，公共代码，被多次引用的
        splitChunks: {
            chunks: 'all',
            minSize: 30000, //文件最小尺寸
            minChunks: 1, //最低引用次数
            maxAsyncRequests: 5, //异步请求的chunks不应该超过此值
            maxInitialRequests: 3, // entry文件请求的chunks不应该超过此值（请求过多，耗时）
            automaticNameDelimiter: '~', //自动命名连接符
            name: true,
            cacheGroups: {
                vendor: { //node_modules内的依赖库
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100,
                    // enforce: true?
                },
                common: { // ‘src/js’ 下的js文件
                    chunks: "all",
                    test: /[\\/]src[\\/]static[\\/]js[\\/]/, //也可以值文件/[\\/]src[\\/]js[\\/].*\.js/,  
                    name: "common", //生成文件名，依据output规则
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1
                }
                //默认配置
                // default: { //cacheGroups重写继承配置，设为false不继承
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // }
            }
        }
    }
});