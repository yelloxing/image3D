import image3D from './Object/index';
import core from './core/index';

// 挂载核心方法
image3D.core = core;

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = image3D;
} else {
    let
        // 保存之前的image3D，防止直接覆盖
        _image3D = window.image3D;

    image3D.noConflict = function () {

        // 如果当前的$$是被最新的image3D覆盖的
        // 恢复之前的
        if (window.image3D === image3D) {
            window.image3D = _image3D;
        }

        // 返回当前image3D
        // 因为调用这个方法以后
        // 全局window下的image3D和$$是什么
        // 已经不一定了
        return image3D;

    };

    // 挂载对象到根
    window.image3D = image3D;
}
