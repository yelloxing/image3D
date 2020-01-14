import Matrix4 from "@yelloxing/core.js/tools/Matrix4";

/**
 * 照相机
 * -------------------------
 */
export default function (CORE, CONFIG) {

    return function () {

        return new function Camera() {

            // 摄像头位置改变和物体位置改变矩阵初始化
            let matrix4 = Matrix4();

            /**
             * 摄像头位置改变
             */

            // 旋转
            this.rotateEye = (deg, a1, b1, c1, a2, b2, c2) => {
                matrix4.rotate(-deg, a1, b1, c1, a2, b2, c2);
                return this;
            };

            // 移动
            this.moveEye = (dis, a, b, c) => {
                matrix4.move(-dis, a, b, c);
                return this;
            };

            /**
             * 物体位置改变
             */

            // 旋转
            this.rotateBody = (deg, a1, b1, c1, a2, b2, c2) => {
                matrix4.rotate(deg, a1, b1, c1, a2, b2, c2);
                return this;
            };

            // 移动
            this.moveBody = (dis, a, b, c) => {
                matrix4.move(dis, a, b, c);
                return this;
            };

            // 缩放
            this.scaleBody = (xTimes, yTimes, zTimes, cx, cy, cz) => {
                matrix4.scale(xTimes, yTimes, zTimes, cx, cy, cz);
                return this;
            };

            // 获取当前的变换矩阵值
            this.value = () => matrix4.value();

        };

    };

};
