import QuickPaper from 'quick-paper';

// 兼容文件
import '@hai2007/polyfill/Promise.js';

// 启动界面
import App from './App.paper';
import core from './pages/core.paper';

// 引入样式
import "@hai2007/style/normalize.css";
import '@hai2007/style/doc-view.css';

window.quickPaper = new QuickPaper({

    // 挂载点
    el: document.getElementById('root'),

    // 启动组件
    render: createElement => createElement(QuickPaper.urlFormat(window.location.href).router[0] == 'core' ? core : App)

});
