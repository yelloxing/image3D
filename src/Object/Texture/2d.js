/**
 * 2D纹理
 * -------------------------
 */
export default function (CORE, CONFIG) {

    return function (unit) {

        return new function Texture2D() {

            // 创建纹理
            let texture = CORE.texture('2d', unit);

            // 绑定图片
            this.write = img => {
                texture.useImage(img);
                return this;
            };

        };

    };

};
