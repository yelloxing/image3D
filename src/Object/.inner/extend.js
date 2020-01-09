/**
 * 合并配置文件
 * --------------------------------------
 * @param {JSON} config1 默认值
 * @param {JSON} config2
 * @return {JSON}
 *
 * 只能做一层合并
 *
 */
export default function (config1, config2) {
    for (let key in config2) {
        try {
            config1[key] = config2[key];
        } catch (e) {
            // 部分特殊的属性不允许修改，会抛错
            throw new Error("Illegal property key : " + key);
        }
    }
    return config1;
};
