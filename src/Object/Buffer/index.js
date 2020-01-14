/**
 * 缓冲区
 * -------------------------
 */
export default function (CORE, CONFIG) {

    return function (isElement) {

        return new function Buffer() {

            // 创建缓冲区
            let buffer = CORE.buffer(isElement);

            // 写入数据的方法
            this.write = data => {
                buffer.write(data);
                return this;
            };

            // 如果是非顶点索引，需要添加数据分配方法
            if (!isElement) {
                this.use = (location, size, stride, offset) => {
                    buffer.use(location, size, stride, offset);
                    return this;
                };
            }

        };

    };

};
