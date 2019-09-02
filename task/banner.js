var $file = require('./tool/file.js');

let pkg = $file.readJSON('package.json');

let banner = `
    /*!
    * image3D - `+ pkg.description + `
    * `+ pkg.repository.url + `
    *
    * author `+ pkg.author + `
    *
    * version `+ pkg.version + `
    *
    * build Thu Apr 11 2019
    *
    * Copyright yelloxing
    * Released under the `+ pkg.license + ` license
    *
    * Date:`+ new Date() + `
    */\n\n`;

module.exports = function () {
    return banner;
};
