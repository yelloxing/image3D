const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const $print = require('./tool/print.js');

async function build(inputOptions, outputOptions) {
    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}
$print.log("\n>>> node run module...");
$print.warn("src/index.js → ./build/module.new.js");

build({
    input: 'src/index.js',
    "plugins": [

        // 帮助 Rollup 查找外部模块，然后安装
        rollupPluginNodeResolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),

        // 将CommonJS模块转换为 ES2015 供 Rollup 处理
        rollupPluginCommonjs({
            include: "node_modules/**",
            exclude: []
        })

    ]
}, {
        format: 'iife',
        "name": "temp",
        file: './build/module.new.js'
    });
