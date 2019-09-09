import Matrix4 from '@yelloxing/core.js/tools/Matrix4';

export default function (initMatrix4) {

    let matrix4 = Matrix4(initMatrix4);

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

};
