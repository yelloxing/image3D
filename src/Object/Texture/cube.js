/**
 * 立方体纹理
 * -------------------------
 */
export default function (CORE, CONFIG) {

    return function (width, height) {

        return new function TextureCube() {

            // 创建纹理
            let texture = CORE.texture('cube');

            // 绑定图片
            this.write = (img1, img2, img3, img4, img5, img6) => {
                texture.useCube([img1, img2, img3, img4, img5, img6], width, height);
                return this;
            };

        };

    };

};
