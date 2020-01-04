# 🍊 image3D
使用webGL绘制三维图片。📊📈🎉 Drawing three-dimensional images using webGL.

[![downloads](https://img.shields.io/npm/dm/image3d.svg)](https://yelloxing.github.io/npm-downloads?interval=7&packages=image3d)
[![install size](https://packagephobia.now.sh/badge?p=image3d)](https://packagephobia.now.sh/result?p=image3d)
[![CDN](https://data.jsdelivr.com/v1/package/npm/image3d/badge)](https://www.jsdelivr.com/package/npm/image3d)
[![Version](https://img.shields.io/npm/v/image3d.svg)](https://www.npmjs.com/package/image3d)
[![License](https://img.shields.io/npm/l/image3d.svg)](https://github.com/yelloxing/image3D/blob/master/LICENSE)

> 鉴于当前浏览器支持情况，本项目只支持webGL 1上下文，更高级版本未来会考虑支持！

## 文档
使用中可以访问[在线接口文档](https://yelloxing.github.io/image3D/)。

## 问题或交流
使用的时候遇到任何问题或有好的建议，请点击进入[issue](https://github.com/yelloxing/image3D/issues)！

## 如何引入
如果你开发的是一个web项目，直接在页面引入打包后的文件后即可（在代码中通过image3D或$$调用）：

```html
<script src="https://cdn.jsdelivr.net/npm/image3d@1.0.2/build/image3D.min.js"></script>
```

如果你想通过npm方式管理，首先你需要通过命令行安装image3D，就像这样：

```bash
npm install --save image3d
```

安装好了以后，在需要的地方引入即可：

```js
import $$ from 'image3d';
```

或

```js
const $$ = require("image3d");
```

## License

[MIT](https://github.com/yelloxing/image3D/blob/master/LICENSE)

Copyright (c) 2019-2020 走一步 再走一步
