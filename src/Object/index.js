/**
 * 核心方法
 */
import render3D from '../core/index';// 3D核心方法

/**
 * 辅助方法
 */
import _extend from './.inner/extend';// 初始化配置文件

/**
 * 主要方法
 */
import $Buffer from './Buffer/index';// 缓冲区
import $Camera from './Camera/index';// 照相机
import $Painter from './Painter/index';// 画笔
import $Texture_2d from './Texture/2d';// 纹理
import $Texture_cube from './Texture/cube';// 纹理
import $Shader from './Shader/index';// 着色器

// 3D绘图对象
// let image3d = new image3d(canvas, config);
let image3D = function (canvas, config) {

    // 配置
    let CONFIG = _extend({

        depth: false// 默认不开启深度计算

    }, config || {});

    // 启动
    let CORE = render3D(canvas);

    // 获取着色器
    let vs = CONFIG["vertex-shader"], fs = CONFIG["fragment-shader"];

    if (!vs || !fs) {
        // 调用内置的着色器
        let shader = $Shader(CONFIG.shader || "default");
        vs = shader.vs;
        fs = shader.fs;
    }

    // 让着色器生效
    CORE.shader(vs, fs);

    image3D.fn = image3D.prototype;

    // 挂载主要方法
    image3D.fn.Buffer = $Buffer(CORE, CONFIG);
    image3D.fn.Camera = $Camera(CORE, CONFIG);
    image3D.fn.Painter = $Painter(CORE, CONFIG);
    image3D.fn.Texture2D = $Texture_2d(CORE, CONFIG);
    image3D.fn.TextureCube = $Texture_cube(CORE, CONFIG);

    // 挂载基础方法
    image3D.fn.setAttributeFloat = function (location, v0, v1, v2, v3) {
        CORE['setAttribute' + (arguments.length - 1) + "f"](location, v0, v1, v2, v3);
        return this;
    };
    image3D.fn.setAttributeInt = function (location, v0, v1, v2, v3) {
        CORE['setAttribute' + (arguments.length - 1) + "i"](location, v0, v1, v2, v3);
        return this;
    };
    image3D.fn.setUniformFloat = function (location, v0, v1, v2, v3) {
        CORE['setUniform' + (arguments.length - 1) + "f"](location, v0, v1, v2, v3);
        return this;
    };
    image3D.fn.setUniformInt = function (location, v0, v1, v2, v3) {
        CORE['setUniform' + (arguments.length - 1) + "i"](location, v0, v1, v2, v3);
        return this;
    };
    image3D.fn.setUniformMatrix = function (location, value) {
        let size = {
            4: 2,
            9: 3,
            16: 4
        }[value.length];
        CORE['setUniformMatrix' + size + "fv"](location, value);
        return this;
    };

};

export default image3D;
