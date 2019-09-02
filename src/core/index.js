import { useShader } from './shader';
import { newBuffer, writeBuffer, useBuffer, deleteBuffer } from './buffer';
import { initTexture, configTexture, linkImage, deleteTexture } from './texture';

// 获取webgl上下文
let getCanvasWebgl = function (node, opts) {
    let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
        context = null, i;
    for (i = 0; i < names.length; i++) {
        try {
            context = node.getContext(names[i], opts);
        } catch (e) { }
        if (context) break;
    }
    return context;
}

let image3D = function (node) {
    return new image3D.prototype.init(node);
};

image3D.prototype.init = function (node) {
    this[0] = node;
    return this;
};

// 扩展方法
// 在image3D和image3D.prototype上分别调用extend方法就可以在类和对象上扩展方法了
image3D.prototype.extend = image3D.extend = function () {

    var target = arguments[0] || {};
    var source = arguments[1] || {};
    var length = arguments.length;

    /*
     * 确定复制目标和源
     */
    if (length === 1) {
        //如果只有一个参数，目标对象是自己
        source = target;
        target = this;
    }
    if (!isObject(target)) {
        //如果目标不是对象或函数，则初始化为空对象
        target = {};
    }

    /*
     * 复制属性到对象上面
     */
    for (let key in source) {
        try {
            target[key] = source[key];
        } catch (e) {

            // 为什么需要try{}catch(e){}？
            // 一些对象的特殊属性不允许覆盖，比如name
            // 执行：image3D.extend({'name':'新名称'})
            // 会抛出TypeError
            throw new Error("Illegal property value！");
        }
    }

    return target;
};

image3D.prototype.init.prototype = image3D.prototype;

// 启动webgl绘图
image3D.prototype.render3D = function (opts) {
    let gl = getCanvasWebgl(this[0], opts),
        glObj = {
            "painter": function () {
                return gl;
            },

            // 启用着色器
            "shader": function (vshaderSource, fshaderSource) {
                gl.program = useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function (isElement) {
                // 创建缓冲区
                let buffer = newBuffer(gl, isElement),
                    bufferData,
                    bufferObj = {
                        // 写入数据
                        "write": function (data, usage) {
                            usage = usage || gl.STATIC_DRAW;
                            writeBuffer(gl, data, usage, isElement);
                            bufferData = data;
                            return bufferObj;
                        },
                        // 分配使用
                        "use": function (location, size, stride, offset, type, normalized) {
                            let fsize = bufferData.BYTES_PER_ELEMENT;
                            if (typeof location == 'string') location = gl.getAttribLocation(gl.program, location);
                            stride = stride || 0;
                            offset = offset || 0;
                            type = type || gl.FLOAT;
                            useBuffer(gl, location, size, type, stride * fsize, offset * fsize, normalized);
                            return bufferObj;
                        },
                        // 关闭退出
                        "close": function () {
                            deleteBuffer(gl, buffer);
                            return glObj;
                        }
                    };
                return bufferObj;
            },

            // 纹理
            "texture": function (unit, type) {
                type = type || gl.TEXTURE_2D;
                // 创建纹理
                let texture = initTexture(gl, unit, type);
                let textureObj = {
                    // 配置纹理对象
                    "config": function (config) {
                        configTexture(gl, type, config);
                        return textureObj;
                    },
                    // 链接图片资源
                    "use": function (level, format, textureType, image) {
                        linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    },
                    // 关闭纹理
                    "close": function () {
                        deleteTexture(gl, texture);
                        return glObj;
                    }
                };
                return textureObj;
            }

        };

    return glObj;
};


export default image3D;
