'use strict';

var $print = require('./tool/print.js');

var options = {
    "rollup+babel打包": "npm run build"
};

// 控制台打印提示信息
$print.log(
    "\n🍊  image3D" +
    "\n------------------------------------------------------------" +
    "\nDrawing three-dimensional images using webGL." +
    "\n使用webGL绘制三维图片。\n"
);
for (let key in options) {
    $print.log(key);
    $print.warn("StepByStep:image3D $  " + options[key] + "\n");
}

