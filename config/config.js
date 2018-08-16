/* 
基本配置
*/
let fs = require('fs');

// 获取 多页面名字数组
function getFileNameList(path) {
    let fileList = [];
    let dirList = fs.readdirSync(path);
    dirList.forEach(item => {
        if (item.indexOf('.html') > -1) {
            fileList.push(item.split('.html')[0]);
        }
    });
    return fileList;
}

let htmlsNameArr = getFileNameList('./src/htmls'); //从根目录开始
console.log(htmlsNameArr)

module.exports = {
    htmlsNameArr: htmlsNameArr,
    cssPublicPath: './dist/css', //单独打包的css放哪？？？？？？？？？？？？？？？？
    imgOutputPath: "../dist/images", //图片输出路径
    devServerOutputPath: "../dist" //服务根目录
}