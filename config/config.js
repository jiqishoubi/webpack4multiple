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
    cssPublicPath: '../',
    imgOutputPath: "../dist/static/images",
    cssOutputPath: "./css/styles.css",
    devServerOutputPath: "../dist"
}