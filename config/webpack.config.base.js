let path = require("path");
let HTMLWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin"); //分离css

let config = require("./config.js");

//生成entry和HTMLWebpackPlugin插件数组
let HTMLPluginsArr = [];
let Entries = {};
config.htmlsNameArr.forEach(function (htmlName) {
    let htmlPlugin = new HTMLWebpackPlugin({
        filename: `${htmlName}.html`,
        template: path.resolve(__dirname, `../src/htmls/${htmlName}.html`), //生成在output里的path里
        //给生成的 js 文件一个独特的 hash 值,是文件名后带？的那个hash,output中的[chunkhash]是文件名中带hash
        hash: true,
        //chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
        //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。
        chunks: [htmlName]
    });
    HTMLPluginsArr.push(htmlPlugin);

    Entries[htmlName] = path.resolve(__dirname, `../src/entries/${htmlName}.js`);
});

module.exports = {
    mode: "none",
    entry: Entries,
    output: {
        filename: "js/[name].bundle.[chunkhash].js", 
        path: path.resolve(__dirname, "../dist")
    },
    module: {
        rules: [
            { 
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            // { 
            //     test: /\.css$/,
            //     exclude: /node_modules/,
            //     use: [
            //         // {
            //         //     loader: MiniCssExtractPlugin.loader,
            //         // },
            //         "css-loader"
            //     ]
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: config.imgOutputPath
                    }
                }
            }
            // {
            //     test: /\.(png|svg|jpg|gif)$/,
            //     use:{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8192
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        ...HTMLPluginsArr // 自动生成 HTML 插件
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ]
}