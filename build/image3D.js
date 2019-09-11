
    /*!
    * image3D - 🍊 使用webGL绘制三维图片。Drawing three-dimensional images using webGL.
    * git+https://github.com/yelloxing/image3D.git
    *
    * author 心叶
    *
    * version 1.0.0
    *
    * build Thu Apr 11 2019
    *
    * Copyright yelloxing
    * Released under the MIT license
    *
    * Date:Wed Sep 11 2019 17:50:49 GMT+0800 (GMT+08:00)
    */

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    /**
     * 着色器一些公共的方法
     * --------------------------------------------
     * 主要是和生成特定着色器无关的方法
     * 着色器分为二类：顶点着色器 + 片段着色器
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
        // 把前面创建的二个着色器对象添加到着色器程序中
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
     * 缓冲区分为二种：
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
    // stride相邻二个数据项的字节数
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
    // type有两个选择gl.TEXTURE_2D代表二维纹理，gl.TEXTURE_CUBE_MAP 立方体纹理
    var initTexture = function initTexture(gl, unit, type) {
        // 创建纹理对象
        var texture = gl.createTexture();
        // 开启纹理单元，unit表示开启的编号
        gl.activeTexture(gl['TEXTURE' + unit]);
        // 绑定纹理对象到目标上
        gl.bindTexture(type, texture);
        return texture;
    };

    // 配置纹理
    var configTexture = function configTexture(gl, type, config) {
        var key = void 0;
        for (key in config) {
            /**
             *
             * 可配置项有四个：
             *  1. gl.TEXTURE_MAX_FILTER：放大方法
             *  2. gl.TEXTURE_MIN_FILTER：缩小方法
             *  3. gl.TEXTURE_WRAP_S：水平填充方法
             *  4. gl.TEXTURE_WRAP_T：垂直填充方法
             *
             */
            gl.texParameteri(type, gl[key], gl[config[key]]);
        }
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
        gl.texImage2D(type, level, format, format, textureType, image);
    };

    /**
     * 判断一个值是不是Object。
     *
     * @since V0.1.2
     * @public
     * @param {*} value 需要判断类型的值
     * @returns {boolean} 如果是Object返回true，否则返回false
     */
    function isObject(value) {
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        return value != null && (type === 'object' || type === 'function');
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

    var image3D = function image3D(node) {
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
        for (var key in source) {
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
        var gl = getCanvasWebgl(this[0], opts),
            glObj = {
            "painter": function painter() {
                return gl;
            },

            // 启用着色器
            "shader": function shader(vshaderSource, fshaderSource) {
                gl.program = useShader(gl, vshaderSource, fshaderSource);
                return glObj;
            },

            // 缓冲区
            "buffer": function buffer(isElement) {
                // 创建缓冲区
                var buffer = newBuffer(gl, isElement),
                    bufferData = void 0,
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
            "texture": function texture(unit, type) {
                type = type || gl.TEXTURE_2D;
                // 创建纹理
                var texture = initTexture(gl, unit, type);
                var textureObj = {
                    // 配置纹理对象
                    "config": function config(_config) {
                        configTexture(gl, type, _config);
                        return textureObj;
                    },
                    // 链接图片资源
                    "use": function use(level, format, textureType, image) {
                        linkImage(gl, type, level, format, textureType, image);
                        return textureObj;
                    }
                };
                return textureObj;
            }

        };

        return glObj;
    };

    /**
     * 在(a,b,c)方向位移d
     * @private
     */
    function _move(d, a, b, c) {
        c = c || 0;
        var sqrt = Math.sqrt(a * a + b * b + c * c);
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a * d / sqrt, b * d / sqrt, c * d / sqrt, 1];
    }

    /**
     * 围绕0Z轴旋转
     * 其它的旋转可以借助transform实现
     * 旋转角度单位采用弧度制
     * 
     * @private
     */
    function _rotate(deg) {
        var sin = Math.sin(deg),
            cos = Math.cos(deg);
        return [cos, sin, 0, 0, -sin, cos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    }

    /**
     * 围绕圆心x、y和z分别缩放xTimes, yTimes和zTimes倍
     * 
     * @private
     */
    function _scale(xTimes, yTimes, zTimes, cx, cy, cz) {
        cx = cx || 0;cy = cy || 0;cz = cz || 0;
        return [xTimes, 0, 0, 0, 0, yTimes, 0, 0, 0, 0, zTimes, 0, cx - cx * xTimes, cy - cy * yTimes, cz - cz * zTimes, 1];
    }

    /**
     * 针对任意射线(a1,b1,c1)->(a2,b2,c2)
     * 计算出二个变换矩阵
     * 分别为：任意射线变成OZ轴变换矩阵 + OZ轴变回原来的射线的变换矩阵
     * 
     * @private
     */
    function _transform(a1, b1, c1, a2, b2, c2) {

        if (typeof a1 === 'number' && typeof b1 === 'number') {

            // 如果设置二个点
            // 表示二维上围绕某个点旋转
            if (typeof c1 !== 'number') {
                c1 = 0;a2 = a1;b2 = b1;c2 = 1;
            }
            // 只设置三个点(设置不足六个点都认为只设置了三个点)
            // 表示围绕从原点出发的射线旋转
            else if (typeof a2 !== 'number' || typeof b2 !== 'number' || typeof c2 !== 'number') {
                    a2 = a1;b2 = b1;c2 = c1;a1 = 0;b1 = 0;c1 = 0;
                }

            if (a1 == a2 && b1 == b2 && c1 == c2) throw new Error('It\'s not a legitimate ray!');

            var sqrt1 = Math.sqrt((a2 - a1) * (a2 - a1) + (b2 - b1) * (b2 - b1)),
                cos1 = sqrt1 != 0 ? (b2 - b1) / sqrt1 : 1,
                sin1 = sqrt1 != 0 ? (a2 - a1) / sqrt1 : 0,
                b = (a2 - a1) * sin1 + (b2 - b1) * cos1,
                c = c2 - c1,
                sqrt2 = Math.sqrt(b * b + c * c),
                cos2 = sqrt2 != 0 ? c / sqrt2 : 1,
                sin2 = sqrt2 != 0 ? b / sqrt2 : 0;

            return [

            // 任意射线变成OZ轴变换矩阵
            [cos1, cos2 * sin1, sin1 * sin2, 0, -sin1, cos1 * cos2, cos1 * sin2, 0, 0, -sin2, cos2, 0, b1 * sin1 - a1 * cos1, c1 * sin2 - a1 * sin1 * cos2 - b1 * cos1 * cos2, -a1 * sin1 * sin2 - b1 * cos1 * sin2 - c1 * cos2, 1],

            // OZ轴变回原来的射线的变换矩阵
            [cos1, -sin1, 0, 0, cos2 * sin1, cos2 * cos1, -sin2, 0, sin1 * sin2, cos1 * sin2, cos2, 0, a1, b1, c1, 1]];
        } else {
            throw new Error('a1 and b1 is required!');
        }
    }

    // 二个4x4矩阵相乘
    // 或矩阵和齐次坐标相乘
    var _multiply = function _multiply(matrix4, param) {
        var newParam = [];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < param.length / 4; j++) {
                newParam[j * 4 + i] = matrix4[i] * param[j * 4] + matrix4[i + 4] * param[j * 4 + 1] + matrix4[i + 8] * param[j * 4 + 2] + matrix4[i + 12] * param[j * 4 + 3];
            }
        }return newParam;
    };

    /**
     * 4x4矩阵
     * 列主序存储
     * @since V0.2.0
     * @public
     */
    function Matrix4(initMatrix4) {

        var matrix4 = initMatrix4 || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

        var matrix4Obj = {

            // 移动
            "move": function move(dis, a, b, c) {
                matrix4 = _multiply(_move(dis, a, b, c), matrix4);
                return matrix4Obj;
            },

            // 旋转
            "rotate": function rotate(deg, a1, b1, c1, a2, b2, c2) {
                var matrix4s = _transform(a1, b1, c1, a2, b2, c2);
                matrix4 = _multiply(_multiply(_multiply(matrix4s[1], _rotate(deg)), matrix4s[0]), matrix4);
                return matrix4Obj;
            },

            // 缩放
            "scale": function scale(xTimes, yTimes, zTimes, cx, cy, cz) {
                matrix4 = _multiply(_scale(xTimes, yTimes, zTimes, cx, cy, cz), matrix4);
                return matrix4Obj;
            },

            // 乘法
            // 可以传入一个矩阵(matrix4,flag)
            "multiply": function multiply(newMatrix4, flag) {
                matrix4 = flag ? _multiply(matrix4, newMatrix4) : _multiply(newMatrix4, matrix4);
                return matrix4Obj;
            },

            // 对一个坐标应用变换
            // 齐次坐标(x,y,z,w)
            "use": function use(x, y, z, w) {
                // w为0表示点位于无穷远处，忽略
                z = z || 0;w = w || 1;
                var temp = _multiply(matrix4, [x, y, z, w]);
                temp[0] = +temp[0].toFixed(7);
                temp[1] = +temp[1].toFixed(7);
                temp[2] = +temp[2].toFixed(7);
                temp[3] = +temp[3].toFixed(7);
                return temp;
            },

            // 矩阵的值
            "value": function value() {
                return matrix4;
            }

        };

        return matrix4Obj;
    }

    function transform(initMatrix4) {

        var matrix4 = Matrix4(initMatrix4);

        return {
            "value": matrix4.value,

            /**
             * 基本变换
             * --------------
             * 旋转、缩放和移动
             */
            "rotate": matrix4.rotate,
            "scale": matrix4.scale,
            "move": matrix4.move
        };
    }

    /**
     * 挂载静态方法
     * -------------------
     * 这里挂载的方法可以通过image3D.XXX()形式直接调用
     * 主要是一个辅助方法
     */
    image3D.extend({
        transform: transform
    });

    /**
     * 挂载对象方法
     * -------------------
     * 这里挂载的方法可以通过image3D().XXX()形式直接调用
     * 和画笔直接相关的方法
     */
    image3D.prototype.extend({});

    image3D.fn = image3D.prototype;

    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === "object" && _typeof(module.exports) === "object") {
        module.exports = image3D;
    } else {
        var
        // 保存之前的image3D，防止直接覆盖
        _image3D = window.image3D,


        // 保存之前的$$，防止直接覆盖
        _$$ = window.$$;

        image3D.noConflict = function (deep) {

            // 如果当前的$$是被最新的image3D覆盖的
            // 恢复之前的
            if (window.$$ === image3D) {
                window.$$ = _$$;
            }

            // 如果当前的image3D是被最新的image3D覆盖的
            // 且标记需要恢复
            // 恢复之前的
            if (deep && window.image3D === image3D) {
                window.image3D = _image3D;
            }

            // 返回当前image3D
            // 因为调用这个方法以后
            // 全局window下的image3D和$$是什么
            // 已经不一定了
            return image3D;
        };

        // 挂载库对象到根
        window.image3D = window.$$ = image3D;
    }
})();