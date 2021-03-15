const fs = require('fs');
const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const babel = require('babel-core');
const cp = require('child_process');

// 生成banner
let banner = function (pkg, name) {
    return `/*!
* ${name} - ` + pkg.description + `
* `+ pkg.repository.url + `
*
* author `+ pkg.author + `
*
* version `+ pkg.version + `
*
* build Thu Apr 11 2019
*
* Copyright hai2007 < https://hai2007.gitee.io/sweethome/ >
* Released under the `+ pkg.license + ` license
*
* Date:`+ new Date() + `
*/\n\n`;

};

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 定义任务
    task: {

        init(cuf, pkg) {

            cuf.print(pkg.name + "@" + pkg.version + " " + pkg.description);

            // 如果打包后的文件存在
            if (fs.existsSync('./build')) cuf.deleteSync('./build');

            cuf.log("\n-----------------------\n环境整理完毕，开始打包！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n");

        },

        end(cuf) {

            cuf.log("\n-----------------------\n打包完毕！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n");

        },

        /**
         * 第一步：模块打包
         * ----------------------
         */
        bundle(cuf) {
            async function build(inputOptions, outputOptions) {
                const bundle = await rollup.rollup(inputOptions);
                await bundle.write(outputOptions);

                cuf.error('模块打包完毕');
            }

            cuf.log("\n[1]模块打包\n");

            // 打包image3D
            build({
                input: 'src/index.js',
                plugins: [

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
                name: "temp",
                file: './build/module.new.js'
            });

            // 打包核心
            build({
                input: 'src/index.core.js',
                plugins: [

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
                name: "temp",
                file: './build/module-core.new.js'
            });
        },

        /**
         * 第二步：babel转义
         * ----------------------
         */
        babel(cuf, pkg) {

            cuf.log("\n[2]babel转义\n");

            // 打包image3D
            babel.transformFile("./build/module.new.js", {}, function (err, result) {
                if (!err) {
                    fs.writeFileSync("./build/image3D.js", banner(pkg,'image3D'));
                    fs.appendFileSync("./build/image3D.js", result.code);
                    cuf.deleteSync("./build/module.new.js");

                    cuf.error('转义完毕');
                } else {
                    console.log(err);
                }
            });

            // 打包核心
            babel.transformFile("./build/module-core.new.js", {}, function (err, result) {
                if (!err) {
                    fs.writeFileSync("./build/image3D-core.js", banner(pkg,'image3DCore'));
                    fs.appendFileSync("./build/image3D-core.js", result.code);
                    cuf.deleteSync("./build/module-core.new.js");

                    cuf.error('转义完毕');
                } else {
                    console.log(err);
                }
            });
        },

        /**
         * 第三步：压缩代码
         * ----------------------
         */
        uglifyjs(cuf, pkg) {

            cuf.log("\n[3]压缩代码\n");

            // 打包image3D
            cp.exec("uglifyjs ./build/image3D.js -m -o ./build/uglifyjs.new.js", function (error) {
                if (error) {
                    console.log(error);
                } else {

                    fs.writeFileSync("./build/image3D.min.js", banner(pkg,'image3D'));
                    fs.appendFileSync("./build/image3D.min.js", fs.readFileSync("./build/uglifyjs.new.js"));

                    cuf.error('压缩完毕');
                }
                cuf.deleteSync("./build/uglifyjs.new.js");
            });

            // 打包核心
            cp.exec("uglifyjs ./build/image3D-core.js -m -o ./build/uglifyjs-core.new.js", function (error) {
                if (error) {
                    console.log(error);
                } else {

                    fs.writeFileSync("./build/image3D-core.min.js", banner(pkg,'image3DCore'));
                    fs.appendFileSync("./build/image3D-core.min.js", fs.readFileSync("./build/uglifyjs-core.new.js"));

                    cuf.error('压缩完毕');
                }
                cuf.deleteSync("./build/uglifyjs-core.new.js");
            });
        }

    }

};
