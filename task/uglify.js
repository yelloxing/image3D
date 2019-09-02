'use strict';

let cp = require('child_process');
let file = require('fs');

let tempFile = "./build/uglifyjs.new.js";

let $print = require('./tool/print.js');
let $file = require('./tool/file.js');
let banner = require('./banner.js');

let options = {
    "banner": banner(),
    "entry": "./build/image3D.js",
    "output": ["./build/image3D.min.js", "./docs/image3D.min.guider.js"]
};

// js代码压缩混淆
$print.log("\n>>> node run uglify...");
$print.warn(options.entry + " → " + tempFile + " → " + options.output);
for (let i = 0; i < options.output.length; i++) {
    $file.write(options.output[i], options.banner || "");
}
cp.exec("uglifyjs " + options.entry + " -m -o " + tempFile, function (error, data) {
    if (error) {
        $print.error(error);
        for (let i = 0; i < options.output.length; i++) {
            $file.writeAppend(options.output[i], error);
        }
        $print.error("\n>> uglifyjs压缩失败\n");
    } else {
        for (let i = 0; i < options.output.length; i++) {
            $file.writeAppend(options.output[i], $file.read(tempFile));
        }
    }
    $print.error("delete " + tempFile + "\n");
    file.unlinkSync(tempFile);
});
