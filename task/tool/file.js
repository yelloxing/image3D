var fs = require("fs");
var path = require('path');

// 当前命令目录
var currentPath = function () {
    return process.cwd();
};

// 文件全路径
var fullPath = function (file) {
    if (/^\//.test(file)) return file;
    return path.join(currentPath(), file);
};

// 判断文件是否存在
var exists = function (file) {
    return fs.existsSync(fullPath(file));
};

// 读取配置文件
var readConfig = function (file, callback, errorback) {
    if (exists(file)) {

        // 配置文件读取选择require方式
        callback(require(fullPath(file)));
    } else errorback("文件【" + file + "】不存在！");
};

// 读取文件
var read = function (file) {
    if (exists(file)) {

        return fs.readFileSync(fullPath(file));
    } else throw new Error("文件【" + file + "】不存在！");
};

// 写入文件
var write = function (file, content) {
    fs.writeFileSync(fullPath(file), content);
};

// 追加文件
var writeAppend = function (file, content) {
    fs.appendFileSync(fullPath(file), content);
};

// 读取JSON
var readJSON = function (file) {
    return JSON.parse(read(file));
};

module.exports = {
    currentPath, fullPath,
    exists,
    readConfig, read, readJSON,
    write, writeAppend
};
