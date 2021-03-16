import image3DCore from './core/index';


if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = image3DCore;
} else {
    let
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
