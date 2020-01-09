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
import $Graphic from './Graphic/index';// 3D图形数据
import $Painter from './Painter/index';// 画笔
import $Shader from './Shader/index';// 着色器
import $Texture from './Texture/index';// 纹理

// 3D绘图对象
// let image3d = new image3d(canvas, config);
let image3D = function (canvas, config) {

    // 配置
    let CONFIG = _extend({

    }, config || {});

    // 启动
    let CORE = render3D(canvas);

    image3D.fn = image3D.prototype;

    // 挂载主要方法
    image3D.fn.Buffer = $Buffer(CORE, CONFIG);
    image3D.fn.Camera = $Camera(CORE, CONFIG);
    image3D.fn.Graphic = $Graphic(CORE, CONFIG);
    image3D.fn.Painter = $Painter(CORE, CONFIG);
    image3D.fn.Shader = $Shader(CORE, CONFIG);
    image3D.fn.Texture = $Texture(CORE, CONFIG);

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
            6: 2,
            9: 3,
            16: 4
        }[value.length];
        CORE['setUniformMatrix' + size + "fv"](location, value);
        return this;
    };

};

export default image3D;
