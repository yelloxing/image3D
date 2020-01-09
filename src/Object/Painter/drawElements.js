export default function (painter, _this) {

    _this.elemPoint = (first, count, type) => {
        type = type || "byte";
        painter.points(first, count, type);
        return _this;
    };

    _this.elemLine = (first, count, type) => {
        type = type || "byte";
        painter.lines(first, count, type);
        return _this;
    };

    _this.elemStripLine = (first, count, type) => {
        type = type || "byte";
        painter.stripLines(first, count, type);
        return _this;
    };

    _this.elemLoopLine = (first, count, type) => {
        type = type || "byte";
        painter.loopLines(first, count, type);
        return _this;
    };

    _this.elemTriangle = (first, count, type) => {
        type = type || "byte";
        painter.triangles(first, count, type);
        return _this;
    };

    _this.elemStripTriangle = (first, count, type) => {
        type = type || "byte";
        painter.stripTriangles(first, count, type);
        return _this;
    };

    _this.elemFanTriangle = (first, count, type) => {
        type = type || "byte";
        painter.fanTriangles(first, count, type);
        return _this;
    };

};
