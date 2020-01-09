import drawArrays from './drawArrays';
import drawElements from './drawElements';

/**
 * 画笔
 * -------------------------
 */
export default function (CORE, CONFIG) {

    let painter = CORE.painter();

    // 判断是否需要开启深度计算
    if (CONFIG.depth) {
        painter.openDeep();
    }

    return function () {

        return new function Painter() {

            // 第一种：点坐标绘制
            drawArrays(painter, this);

            // 第二种：顶点索引绘制
            drawElements(painter, this);

        };

    };
};
