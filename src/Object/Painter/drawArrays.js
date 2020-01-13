export default function (painter, _this) {

    _this.drawPoint = (first, count) => {
        painter.points(first, count);
        return _this;
    };

    _this.drawLine = (first, count) => {
        painter.lines(first, count);
        return _this;
    };

    _this.drawStripLine = (first, count) => {
        painter.stripLines(first, count);
        return _this;
    };

    _this.drawLoopLine = (first, count) => {
        painter.loopLines(first, count);
        return _this;
    };

    _this.drawTriangle = (first, count) => {
        painter.triangles(first, count);
        return _this;
    };

    _this.drawStripTriangle = (first, count) => {
        painter.stripTriangles(first, count);
        return _this;
    };

    _this.drawFanTriangle = (first, count) => {
        painter.fanTriangles(first, count);
        return _this;
    };

};
