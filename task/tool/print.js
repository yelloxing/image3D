// 普通文字
exports.log = function (txt) {
    console.log("\x1B[30m" + txt + "\x1B[39m");
};

// 警告
exports.warn = function (txt) {
    console.log("\x1B[33m" + txt + "\x1B[39m");
};

// 错误或重要提示
exports.error = function (txt) {
    console.log("\x1B[35m" + txt + "\x1B[39m");
};
