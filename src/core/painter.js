export default function (gl) {
    return {

        /**
         * gl.drawArrays
         */

        // 绘制点
        points(first, count) {
            gl.drawArrays(gl.POINTS, first, count);
        },

        // 绘制直线
        lines(first, count) {
            gl.drawArrays(gl.LINES, first, count * 2);
        },

        // 绘制连续直线
        stripLines(first, count) {
            gl.drawArrays(gl.LINE_STRIP, first, count + 1);
        },

        // 绘制闭合直线
        loopLines(first, count) {
            gl.drawArrays(gl.LINE_LOOP, first, count);
        },

        // 绘制三角形
        triangles(first, count) {
            gl.drawArrays(gl.TRIANGLES, first, count * 3);
        },

        // 绘制共有边三角形
        stripTriangles(first, count) {
            gl.drawArrays(gl.TRIANGLE_STRIP, first, count + 2);
        },

        // 绘制旋转围绕三角形
        fanTriangles(first, count) {
            gl.drawArrays(gl.TRIANGLE_FAN, first, count + 2);
        }

    };
};
