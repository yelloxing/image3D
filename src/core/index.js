import { useShader } from './shader';
import { newBuffer, writeBuffer, useBuffer } from './buffer';
import { initTexture, configTexture, linkImage } from './texture';
import value from './value';
import painter from './painter';

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

// 绘图核心对象
export default function (node, opts) {
    let gl = getCanvasWebgl(node, opts),
        glObj = {

            // 画笔
            "painter": function () {
                return painter(gl);
            },

            // 启用着色器
            "shader": function (vshaderSource, fshaderSource) {
                gl.program = useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function (isElement) {
                // 创建缓冲区
                newBuffer(gl, isElement);
                let bufferData,
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
                        }
                    };
                return bufferObj;
            },

            // 纹理
            "texture": function (unit, type) {
                type = {
                    "2d": gl.TEXTURE_2D,/*二维纹理(默认值)*/

                    // "2ds": gl.TEXTURE_2D_ARRAY,/*二维纹理数组 webgl2支持*/
                    // "3d": gl.TEXTURE_3D,/*三维纹理 webgl2支持*/

                    "cube": gl.TEXTURE_CUBE_MAP/*立方体纹理*/
                }[type] || gl.TEXTURE_2D;

                // 创建纹理
                initTexture(gl, unit, type);

                // 配置纹理（默认配置）
                configTexture(gl, type, {
                    "TEXTURE_MAX_FILTER": "NEAREST",
                    "TEXTURE_MIN_FILTER": "NEAREST",
                    "TEXTURE_WRAP_S": "CLAMP_TO_EDGE",
                    "TEXTURE_WRAP_T": "CLAMP_TO_EDGE"
                });

                let textureObj = {
                    // 配置纹理对象
                    // 此方法目前先不对外保留
                    // "config": function (config) {
                    //     configTexture(gl, type, config);
                    //     return textureObj;
                    // },
                    // 链接图片资源
                    "use": function (image, level, format, textureType) {
                        linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    }
                };
                return textureObj;
            }

        };

    // attribue和uniform数据设置
    let valueMethods = value(gl);
    for (let key in valueMethods) {
        glObj[key] = valueMethods[key];
    }

    return glObj;
};
