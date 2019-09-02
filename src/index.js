import image3D from './image3D';

if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = image3D;
} else {
    let
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
