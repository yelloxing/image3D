(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{20:function(a,c,e){var p=e(21);"string"==typeof p&&(p=[[a.i,p,""]]),p.locals&&(a.exports=p.locals);(0,e(2).default)("data-quickpaper-a77cdb68",p,!0)},21:function(a,c,e){(a.exports=e(1)(!1)).push([a.i,"",""])},26:function(a,c,e){"use strict";e.r(c);var p={};e(20);p.render=function(a){return a("div",{class:"doc-view",quickpaper:"","data-quickpaper-a77cdb68":""},[a("h2",{"@click":'doScroll("import")',id:"fixed-import",class:"canClick","data-quickpaper-a77cdb68":""},["如何引入？"]),a("h3",{"data-quickpaper-a77cdb68":""},["CDN方式"]),a("p",{"data-quickpaper-a77cdb68":""},["请直接在页面中加入下面这行代码，然后通过image3D即可调用（查看",a("a",{href:"https://github.com/hai2007/image3D/blob/master/CHANGELOG",target:"_blank","data-quickpaper-a77cdb68":""},["更新日志"]),"选择版本）："]),a("pre",{"q-code":"html","data-quickpaper-a77cdb68":""},['<script src="https://cdn.jsdelivr.net/npm/image3d@3.0.0/build/image3D.min.js"><\/script>']),a("h3",{"data-quickpaper-a77cdb68":""},["NPM方式"]),a("p",{"data-quickpaper-a77cdb68":""},["首先，需要安装image3D，就像这样："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["npm install --save image3d"]),a("p",{"data-quickpaper-a77cdb68":""},["安装好了以后，在需要的地方引入即可："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["import image3D from 'image3d';"]),a("h2",{"@click":'doScroll("object")',id:"fixed-object",class:"canClick","data-quickpaper-a77cdb68":""},["3D对象"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var image3d = new image3D(canvas, config);"]),a("p",{"data-quickpaper-a77cdb68":""},["通过new的方式可以创建一个3D对象，记作image3d(注意和image3D区分，前者表示3D对象，后者表示3D类，后面不再赘述)，所有的3D绘图操作接口都由此提供。"]),a("h3",{"data-quickpaper-a77cdb68":""},["配置 config"]),a("p",{"data-quickpaper-a77cdb68":""},["上面的canvas表示一个canvas结点，下面主要来说说config可配置项。"]),a("h4",{"data-quickpaper-a77cdb68":""},["1.着色器 [可选，有默认值]"]),a("p",{"data-quickpaper-a77cdb68":""},['"vertex-shader"和"fragment-shader"分别用于配置顶点着色器和片段着色器，值是两段着色器字符串。']),a("p",{"data-quickpaper-a77cdb68":""},['当然，如果你没有传递具体的着色器，那么你可以选择调用内置的着色器，只需要配置"shader"属性即可。']),a("p",{"data-quickpaper-a77cdb68":""},["目前可选的着色器类型列举如下："]),a("ul",{"data-quickpaper-a77cdb68":""},[a("li",{"data-quickpaper-a77cdb68":""},[a("span",{class:"important","data-quickpaper-a77cdb68":""},['"default"']),"：默认值，此着色器你可以控制点的位置、大小和颜色，对外暴露的变量名称分别为：a_position、a_size和a_color。"]),a("li",{"data-quickpaper-a77cdb68":""},[a("span",{class:"important","data-quickpaper-a77cdb68":""},['"camera"']),"：相比于默认的着色器，多了一个照相机控制接口：u_matrix，你可以使用照相机生成变换矩阵传递进来，控制观察方式。"])]),a("h4",{"data-quickpaper-a77cdb68":""},["2.深度计算 [可选]"]),a("p",{"data-quickpaper-a77cdb68":""},['"depth"用于配置是否开启深度计算，默认false关闭，如果配置true表示开启，开启意味着渲染的时候根据z值进行计算。']),a("h2",{"@click":'doScroll("painter")',id:"fixed-painter",class:"canClick","data-quickpaper-a77cdb68":""},["画笔"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var painter = image3d.Painter();"]),a("p",{"data-quickpaper-a77cdb68":""},["画笔主要分为二类：普通画笔和基于顶点索引的画笔。"]),a("h3",{"data-quickpaper-a77cdb68":""},["普通画笔"]),a("h4",{"data-quickpaper-a77cdb68":""},["点"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawPoint(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawLine(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["连续直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawStripLine(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["闭合直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawLoopLine(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawTriangle(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["共边三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawStripTriangle(first, count);"]),a("h4",{"data-quickpaper-a77cdb68":""},["旋转围绕三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.drawFanTriangle(first, count);"]),a("h3",{"data-quickpaper-a77cdb68":""},["索引画笔"]),a("h4",{"data-quickpaper-a77cdb68":""},["点"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemPoint(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemLine(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["连续直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemStripLine(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["闭合直线"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemLoopLine(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemTriangle(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["共边三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemStripTriangle(first, count, type);"]),a("h4",{"data-quickpaper-a77cdb68":""},["旋转围绕三角形"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["painter.elemFanTriangle(first, count, type);"]),a("h2",{"@click":'doScroll("data")',id:"fixed-data",class:"canClick","data-quickpaper-a77cdb68":""},["数据传递"]),a("h3",{"data-quickpaper-a77cdb68":""},["设置值或向量"]),a("p",{"data-quickpaper-a77cdb68":""},["设置Attribute类型的Float类型值或向量（v1~v3均可选，会根据最终输入的参数长度自动判断设置的值类型或向量长度，下同）:"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["image3d.setAttributeFloat(location, v0, v1, v2, v3);"]),a("p",{"data-quickpaper-a77cdb68":""},["设置Attribute类型的Int类型值或向量："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["image3d.setAttributeInt(location, v0, v1, v2, v3);"]),a("p",{"data-quickpaper-a77cdb68":""},["设置Uniform类型的Float类型值或向量："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["image3d.setUniformFloat(location, v0, v1, v2, v3);"]),a("p",{"data-quickpaper-a77cdb68":""},["设置Uniform类型的Int类型值或向量："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["image3d.setUniformInt(location, v0, v1, v2, v3);"]),a("h3",{"data-quickpaper-a77cdb68":""},["设置矩阵"]),a("p",{"data-quickpaper-a77cdb68":""},["设置Uniform类型的矩阵，value应该是一个数组，会自动根据此数组的长度来判断是2x2、3x3还是4x4尺寸："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["image3d.setUniformMatrix(location, value);"]),a("h2",{"@click":'doScroll("buffer")',id:"fixed-buffer",class:"canClick","data-quickpaper-a77cdb68":""},["缓冲区"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var buffer = image3d.Buffer(isElement);"]),a("p",{"data-quickpaper-a77cdb68":""},["获取缓冲区对象的时候需要传递一个boolean类型的参数isElement，用来表示是否是包含顶点的索引值类型的缓冲区。"]),a("h3",{"data-quickpaper-a77cdb68":""},["1.写入数据"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["buffer.write(data);"]),a("h3",{"data-quickpaper-a77cdb68":""},["2.分配数据"]),a("p",{"data-quickpaper-a77cdb68":""},["如果isElement没有传递或设置为false，后续需要使用use来分配缓冲区中的数据："]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["buffer.use(location, size, stride, offset);"]),a("ol",{"data-quickpaper-a77cdb68":""},[a("li",{"data-quickpaper-a77cdb68":""},["location：字符串类型，对应顶点着色器中定义的attribute类型的变量名"]),a("li",{"data-quickpaper-a77cdb68":""},["size：整数，表示一个完整的数据的个数"]),a("li",{"data-quickpaper-a77cdb68":""},["stride：整数，表示写入缓冲区数据一组的个数"]),a("li",{"data-quickpaper-a77cdb68":""},["offset：整数，表示读取起点"])]),a("h2",{"@click":'doScroll("texture")',id:"fixed-texture",class:"canClick","data-quickpaper-a77cdb68":""},["纹理"]),a("h3",{"data-quickpaper-a77cdb68":""},["二维纹理"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var texture=image3d.Texture2D(unit);"]),a("p",{"data-quickpaper-a77cdb68":""},["创建二维纹理的时候需要传递一个数字，用于表示纹理对应的纹理单元（比如0、1、2等）。"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["texture.write(image);"]),a("p",{"data-quickpaper-a77cdb68":""},["二维纹理其实是用一张图片贴图，因此需要写入用作纹理的图片。"]),a("h3",{"data-quickpaper-a77cdb68":""},["立方纹理"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var texture=image3d.TextureCube(width, height);"]),a("p",{"data-quickpaper-a77cdb68":""},["此纹理创建的时候需要传递图片的宽和高。"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["texture.write(img1, img2, img3, img4, img5, img6);"]),a("p",{"data-quickpaper-a77cdb68":""},["类似一个长方体，有六个面，因此我们需要写入六张图片。"]),a("h2",{"@click":'doScroll("camera")',id:"fixed-camera",class:"canClick","data-quickpaper-a77cdb68":""},["照相机"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var camera = image3d.Camera();"]),a("p",{"data-quickpaper-a77cdb68":""},["改变相机或物体的相对位置或别的和怎么看相关的一些控制方法，都由一个矩阵来定义，我们不必直接操作这个矩阵，通过照相机这个对象，你会更容易去控制这一切。"]),a("h3",{"data-quickpaper-a77cdb68":""},["物体的改变"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["camera.rotateBody(deg, a1, b1, c1, a2, b2, c2);"]),a("p",{"data-quickpaper-a77cdb68":""},["围绕射线(a1, b1, c1) → (a2, b2, c2)旋转物体deg度（方向由右手法则确定），a1、b1、c1、a2、b2和c2这6个值在设置的时候，不是一定需要全部设置，还有以下可选："]),a("ol",{"data-quickpaper-a77cdb68":""},[a("li",{"data-quickpaper-a77cdb68":""},["只设置了a1和b1，表示在xoy平面围绕（a1, b1）旋转。"]),a("li",{"data-quickpaper-a77cdb68":""},["设置三个点(设置不足六个点都认为只设置了三个点)，表示围绕从原点出发的射线旋转。"])]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["camera.moveBody(dis, a, b, c);"]),a("p",{"data-quickpaper-a77cdb68":""},["沿着向量(a, b, c)方向移动物体距离dis（其中c可以不传，默认0）。"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["camera.scaleBody(xTimes, yTimes, zTimes, cx, cy, cz);"]),a("p",{"data-quickpaper-a77cdb68":""},["以点(cx, cy, cz)为中心，分别在x、y和z方向上缩放xTimes、yTimes和zTimes倍（其中cx、cy和cz都可以不传递，默认0）物体。"]),a("h3",{"data-quickpaper-a77cdb68":""},["相机的改变"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["camera.rotateEye(deg, a1, b1, c1, a2, b2, c2);"]),a("p",{"data-quickpaper-a77cdb68":""},["和物体的改变中的旋转类似，不同的是这里旋转的是相机。"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["camera.moveEye(dis, a, b, c);"]),a("p",{"data-quickpaper-a77cdb68":""},["沿着向量(a, b, c)方向移动相机距离dis（其中c可以不传，默认0）。"]),a("h3",{"data-quickpaper-a77cdb68":""},["使用"]),a("pre",{"q-code":"","data-quickpaper-a77cdb68":""},["var matrix4=camera.value();"]),a("p",{"data-quickpaper-a77cdb68":""},["所有的操作最终通过这个方法获取列优先4x4矩阵，后续你需要在顶点着色器中使用即可。"])])};c.default=p}}]);