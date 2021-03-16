import QuickPaper from 'quick-paper';

// 兼容文件
import '@hai2007/polyfill/Promise.js';

// 启动界面
let pages = {
    app: () => import('./App.paper'),
    core: () => import('./pages/core.paper')
};

// 引入样式
import "@hai2007/style/normalize.css";
import '@hai2007/style/doc-view.css';
import './style.css';

import fixedScroll from './services/fixedScroll'; QuickPaper.prototype.fixedScroll = fixedScroll;
import doScroll from './services/doScroll'; QuickPaper.prototype.doScroll = doScroll;

pages[QuickPaper.urlFormat(window.location.href).router[0] == 'core' ? 'core' : 'app']().then(data => {

    window.quickPaper = new QuickPaper({

        // 挂载点
        el: document.getElementById('root'),

        // 启动组件
        render: createElement => createElement(data.default)

    });

});
