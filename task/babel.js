'use strict';

let babel = require('babel-core');
let file = require('fs');

var $print = require('./tool/print.js');
var $file = require('./tool/file.js');
var banner = require('./banner.js');

var options = {
    "banner": banner(),
    // 中间文件是否删除
    "delete_temp": true,
    "entry": "./build/module.new.js",
    "output": "./build/image3D.js"
};

// babel转义
$print.log("\n>>> node run babel...");
$print.warn(options.entry + " → " + options.output);

// 使用babel方法转义
babel.transformFile(options.entry, {}, function (err, result) {
    if (result) {
        $file.write(options.output, options.banner || "");
        $file.writeAppend(options.output, result.code);
        if (options.delete_temp) {
            file.unlinkSync(options.entry);
            $print.error("delete " + options.entry + "\n");
        }
    } else {
        $print.error("\n>> babel转义失败！\n");
    }
});
