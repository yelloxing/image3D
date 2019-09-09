import image3D from './core/index';

/**
 * 挂载静态方法
 * -------------------
 * 这里挂载的方法可以通过image3D.XXX()形式直接调用
 * 主要是一个辅助方法
 */
image3D.extend({

});

/**
 * 挂载对象方法
 * -------------------
 * 这里挂载的方法可以通过image3D().XXX()形式直接调用
 * 和画笔直接相关的方法
 */
image3D.prototype.extend({

});

image3D.fn = image3D.prototype;

export default image3D;
