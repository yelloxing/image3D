/*!
* image3DCore - 🍊 使用webGL绘制三维图片。Drawing three-dimensional images using webGL.
* git+https://github.com/hai2007/image3D.git
*
* author 你好2007
*
* version 3.0.0
*
* build Thu Apr 11 2019
*
* Copyright hai2007 < https://hai2007.gitee.io/sweethome/ >
* Released under the MIT license
*
* Date:Mon Mar 15 2021 11:15:25 GMT+0800 (GMT+08:00)
*/

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    /**
     * 着色器一些公共的方法
     * --------------------------------------------
     * 主要是和生成特定着色器无关的方法
     * 着色器分为两类：顶点着色器 + 片段着色器
     * 前者用于定义一个点的特性，比如位置，大小，颜色等
     * 后者用于针对每个片段（可以理解为像素）进行处理
     *
     * 着色器采用的语言是：GLSL ES语言
     */

    // 把着色器字符串加载成着色器对象

    var loadShader = function loadShader(gl, type, source) {
        // 创建着色器对象
        var shader = gl.createShader(type);
        if (shader == null) throw new Error('Unable to create shader!');
        // 绑定资源
        gl.shaderSource(shader, source);
        // 编译着色器
        gl.compileShader(shader);
        // 检测着色器编译是否成功
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Failed to compile shader:' + gl.getShaderInfoLog(shader));
        return shader;
    };

    // 初始化着色器
    var useShader = function useShader(gl, vshaderSource, fshaderSource) {
        // 分别加载顶点着色器对象和片段着色器对象
        var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshaderSource),
            fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshaderSource);
        // 创建一个着色器程序
        var glProgram = gl.createProgram();
        // 把前面创建的两个着色器对象添加到着色器程序中
        gl.attachShader(glProgram, vertexShader);
        gl.attachShader(glProgram, fragmentShader);
        // 把着色器程序链接成一个完整的程序
        gl.linkProgram(glProgram);
        // 检测着色器程序链接是否成功
        if (!gl.getProgramParameter(glProgram, gl.LINK_STATUS)) throw new Error('Failed to link program: ' + gl.getProgramInfoLog(glProgram));
        // 使用这个完整的程序
        gl.useProgram(glProgram);
        return glProgram;
    };

    /**
     * 缓冲区核心方法
     * --------------------------------------------
     * 缓冲区分为两种：
     *  1.缓冲区中保存了包含顶点的数据
     *  2.缓冲区保存了包含顶点的索引值
     *
     */

    // 获取一个新的缓冲区
    // isElement默认false，创建第一种缓冲区，为true创建第二种
    var newBuffer = function newBuffer(gl, isElement) {
        var buffer = gl.createBuffer(),
            TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        // 把缓冲区对象绑定到目标
        gl.bindBuffer(TYPE, buffer);
        return buffer;
    };

    // 数据写入缓冲区
    // data是一个类型化数组，表示写入的数据
    // usage表示程序如何使用存储在缓冲区的数据
    var writeBuffer = function writeBuffer(gl, data, usage, isElement) {
        var TYPE = isElement ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        gl.bufferData(TYPE, data, usage);
    };

    // 使用缓冲区数据
    // location指定待分配的attribute变量的存储位置
    // size每个分量个数
    // type数据类型，应该是以下的某个：
    //      gl.UNSIGNED_BYTE    Uint8Array
    //      gl.SHORT            Int16Array
    //      gl.UNSIGNED_SHORT   Uint16Array
    //      gl.INT              Int32Array
    //      gl.UNSIGNED_INT     Uint32Array
    //      gl.FLOAT            Float32Array
    // stride相邻两个数据项的字节数
    // offset数据的起点字节位置
    // normalized是否把非浮点型的数据归一化到[0,1]或[-1,1]区间
    var useBuffer = function useBuffer(gl, location, size, type, stride, offset, normalized) {
        // 把缓冲区对象分配给目标变量
        gl.vertexAttribPointer(location, size, type, normalized || false, stride || 0, offset || 0);
        // 连接目标对象和缓冲区对象
        gl.enableVertexAttribArray(location);
    };

    /**
     * 纹理方法
     * --------------------------------------------
     * 在绘制的多边形上贴图
     * 丰富效果
     */

    // 初始化一个纹理对象
    // type有gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理等
    var initTexture = function initTexture(gl, type, unit, _type_) {
        // 创建纹理对象
        var texture = gl.createTexture();

        if (_type_ == '2d') {
            unit = unit || 0;
            // 开启纹理单元，unit表示开启的编号
            gl.activeTexture(gl['TEXTURE' + unit]);
        }

        // 绑定纹理对象到目标上
        gl.bindTexture(type, texture);
        return texture;
    };

    // 链接资源图片
    // level默认传入0即可，和金字塔纹理有关
    // format表示图像的内部格式：
    //      gl.RGB(红绿蓝)
    //      gl.RGBA(红绿蓝透明度)
    //      gl.ALPHA(0.0,0.0,0.0,透明度)
    //      gl.LUMINANCE(L、L、L、1L:流明)
    //      gl.LUMINANCE_ALPHA(L、L、L,透明度)
    // textureType表示纹理数据的格式：
    //      gl.UNSIGNED_BYTE: 表示无符号整形，每一个颜色分量占据1字节
    //      gl.UNSIGNED_SHORT_5_6_5: 表示RGB，每一个分量分别占据占据5, 6, 5比特
    //      gl.UNSIGNED_SHORT_4_4_4_4: 表示RGBA，每一个分量分别占据占据4, 4, 4, 4比特
    //      gl.UNSIGNED_SHORT_5_5_5_1: 表示RGBA，每一个分量分别占据占据5比特，A分量占据1比特
    var linkImage = function linkImage(gl, type, level, format, textureType, image) {
        format = {
            "rgb": gl.RGB,
            "rgba": gl.RGBA,
            "alpha": gl.ALPHA
        }[format] || gl.RGBA;

        gl.texImage2D(type, level || 0, format, format, {

            // 目前一律采用默认值，先不对外提供修改权限

        }[textureType] || gl.UNSIGNED_BYTE, image);
    };

    var linkCube = function linkCube(gl, type, level, format, textureType, images, width, height, texture) {
        format = {
            "rgb": gl.RGB,
            "rgba": gl.RGBA,
            "alpha": gl.ALPHA
        }[format] || gl.RGBA;

        level = level || 0;

        textureType = {

            // 目前一律采用默认值，先不对外提供修改权限

        }[textureType] || gl.UNSIGNED_BYTE;

        var types = [gl.TEXTURE_CUBE_MAP_POSITIVE_X, //右
        gl.TEXTURE_CUBE_MAP_NEGATIVE_X, //左
        gl.TEXTURE_CUBE_MAP_POSITIVE_Y, //上
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, //下
        gl.TEXTURE_CUBE_MAP_POSITIVE_Z, //后
        gl.TEXTURE_CUBE_MAP_NEGATIVE_Z //前
        ],
            i = void 0,
            target = void 0;

        for (i = 0; i < types.length; i++) {
            target = types[i];
            gl.texImage2D(target, level, format, width, height, 0, format, textureType, null);
            gl.bindTexture(type, texture);
            gl.texImage2D(target, level, format, format, textureType, images[i]);
        }

        gl.generateMipmap(type);
    };

    function value(gl) {
        return {

            /**
             * attribue
             * ----------------------------------------
             */

            // 浮点数
            setAttribute1f: function setAttribute1f(name, v0) {
                // 获取存储位置
                var location = gl.getAttribLocation(gl.program, name);
                // 传递数据给变量
                gl.vertexAttrib1f(location, v0);
            },
            setAttribute2f: function setAttribute2f(name, v0, v1) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib2f(location, v0, v1);
            },
            setAttribute3f: function setAttribute3f(name, v0, v1, v2) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib3f(location, v0, v1, v2);
            },
            setAttribute4f: function setAttribute4f(name, v0, v1, v2, v3) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib4f(location, v0, v1, v2, v3);
            },


            // 整数
            setAttribute1i: function setAttribute1i(name, v0) {
                // 获取存储位置
                var location = gl.getAttribLocation(gl.program, name);
                // 传递数据给变量
                gl.vertexAttrib1i(location, v0);
            },
            setAttribute2i: function setAttribute2i(name, v0, v1) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib2i(location, v0, v1);
            },
            setAttribute3i: function setAttribute3i(name, v0, v1, v2) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib3i(location, v0, v1, v2);
            },
            setAttribute4i: function setAttribute4i(name, v0, v1, v2, v3) {
                var location = gl.getAttribLocation(gl.program, name);
                gl.vertexAttrib4i(location, v0, v1, v2, v3);
            },


            /**
            * uniform
            * ----------------------------------------
            */

            // 浮点数
            setUniform1f: function setUniform1f(name, v0) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform1f(location, v0);
            },
            setUniform2f: function setUniform2f(name, v0, v1) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform2f(location, v0, v1);
            },
            setUniform3f: function setUniform3f(name, v0, v1, v2) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform3f(location, v0, v1, v2);
            },
            setUniform4f: function setUniform4f(name, v0, v1, v2, v3) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform4f(location, v0, v1, v2, v3);
            },


            // 整数
            setUniform1i: function setUniform1i(name, v0) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform1i(location, v0);
            },
            setUniform2i: function setUniform2i(name, v0, v1) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform2i(location, v0, v1);
            },
            setUniform3i: function setUniform3i(name, v0, v1, v2) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform3i(location, v0, v1, v2);
            },
            setUniform4i: function setUniform4i(name, v0, v1, v2, v3) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniform4i(location, v0, v1, v2, v3);
            },


            // 矩阵
            setUniformMatrix2fv: function setUniformMatrix2fv(name, value) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniformMatrix2fv(location, false, value);
            },
            setUniformMatrix3fv: function setUniformMatrix3fv(name, value) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniformMatrix3fv(location, false, value);
            },
            setUniformMatrix4fv: function setUniformMatrix4fv(name, value) {
                var location = gl.getUniformLocation(gl.program, name);
                gl.uniformMatrix4fv(location, false, value);
            }
        };
    }

    function _painter(gl) {

        var typeMap = {
            "byte": gl.UNSIGNED_BYTE,
            "short": gl.UNSIGNED_SHORT
        };

        return {

            // 开启深度计算
            openDeep: function openDeep() {
                gl.enable(gl.DEPTH_TEST);
                return this;
            },


            // 绘制点
            points: function points(first, count, type) {
                if (type) {
                    gl.drawElements(gl.POINTS, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.POINTS, first, count);
                }
                return this;
            },


            // 绘制直线
            lines: function lines(first, count, type) {
                if (type) {
                    gl.drawElements(gl.LINES, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.LINES, first, count);
                }
                return this;
            },


            // 绘制连续直线
            stripLines: function stripLines(first, count, type) {
                if (type) {
                    gl.drawElements(gl.LINE_STRIP, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.LINE_STRIP, first, count);
                }
                return this;
            },


            // 绘制闭合直线
            loopLines: function loopLines(first, count, type) {
                if (type) {
                    gl.drawElements(gl.LINE_LOOP, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.LINE_LOOP, first, count);
                }
                return this;
            },


            // 绘制三角形
            triangles: function triangles(first, count, type) {
                if (type) {
                    gl.drawElements(gl.TRIANGLES, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.TRIANGLES, first, count);
                }
                return this;
            },


            // 绘制共有边三角形
            stripTriangles: function stripTriangles(first, count, type) {
                if (type) {
                    gl.drawElements(gl.TRIANGLE_STRIP, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.TRIANGLE_STRIP, first, count);
                }
                return this;
            },


            // 绘制旋转围绕三角形
            fanTriangles: function fanTriangles(first, count, type) {
                if (type) {
                    gl.drawElements(gl.TRIANGLE_FAN, count, typeMap[type], first);
                } else {
                    gl.drawArrays(gl.TRIANGLE_FAN, first, count);
                }
                return this;
            }
        };
    }

    // 获取webgl上下文
    var getCanvasWebgl = function getCanvasWebgl(node, opts) {
        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"],
            context = null,
            i = void 0;
        for (i = 0; i < names.length; i++) {
            try {
                context = node.getContext(names[i], opts);
            } catch (e) {}
            if (context) break;
        }
        return context;
    };

    // 绘图核心对象
    function image3DCore(node, opts) {
        var gl = getCanvasWebgl(node, opts),
            glObj = {

            // 画笔
            "painter": function painter() {
                return _painter(gl);
            },

            // 启用着色器
            "shader": function shader(vshaderSource, fshaderSource) {
                gl.program = useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function buffer(isElement) {
                // 创建缓冲区
                newBuffer(gl, isElement);
                var bufferData = void 0,
                    bufferObj = {
                    // 写入数据
                    "write": function write(data, usage) {
                        usage = usage || gl.STATIC_DRAW;
                        writeBuffer(gl, data, usage, isElement);
                        bufferData = data;
                        return bufferObj;
                    },
                    // 分配使用
                    "use": function use(location, size, stride, offset, type, normalized) {
                        var fsize = bufferData.BYTES_PER_ELEMENT;
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
            "texture": function texture(_type_, unit) {
                var type = {
                    "2d": gl.TEXTURE_2D, /*二维纹理*/
                    "cube": gl.TEXTURE_CUBE_MAP /*立方体纹理*/
                }[_type_];

                // 创建纹理
                var texture = initTexture(gl, type, unit, _type_);

                // 配置纹理（默认配置）
                gl.texParameteri(type, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.texParameteri(type, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(type, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                var textureObj = {
                    // 链接图片资源
                    "useImage": function useImage(image, level, format, textureType) {
                        linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    },
                    // 链接多张图片
                    "useCube": function useCube(images, width, height, level, format, textureType) {
                        linkCube(gl, type, level, format, textureType, images, width, height, texture);
                    }
                };
                return textureObj;
            }

        };

        // attribue和uniform数据设置
        var valueMethods = value(gl);
        for (var key in valueMethods) {
            glObj[key] = valueMethods[key];
        }

        return glObj;
    }

    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        module.exports = image3DCore;
    } else {
        var
        // 保存之前的image3DCore，防止直接覆盖
        _image3DCore = window.image3DCore;

        image3D.noConflict = function () {

            // 如果当前的$$是被最新的image3DCore覆盖的
            // 恢复之前的
            if (window.image3DCore === image3DCore) {
                window.image3DCore = _image3DCore;
            }

            // 返回当前image3DCore
            // 因为调用这个方法以后
            // 全局window下的image3DCore和$$是什么
            // 已经不一定了
            return image3DCore;
        };

        // 挂载对象到根
        window.image3DCore = image3DCore;
    }
})();