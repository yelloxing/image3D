import type_default from './default';
import type_camera from './camera';

// 统一管理内置的着色器
export default function (typeName) {
    return {
        type_default,
        type_camera
    }["type_" + typeName];
};
