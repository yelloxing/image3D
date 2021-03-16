import animation from '@hai2007/tool/animation';
import QuickPaper from 'quick-paper';

export default function () {

    let overValue = 0;

    let element = document.documentElement;

    let fixed = QuickPaper.urlFormat(window.location.href).params.fixed;
    if (fixed) {

        // 获取滚动调整结点
        let fixedDom = document.getElementById('fixed-' + fixed);
        if (fixedDom) {
            let offsetTop = fixedDom.offsetTop - overValue;
            let currentScrollTop = element.scrollTop || 0;
            animation(deep => {
                element.scrollTop = (offsetTop - currentScrollTop) * deep + currentScrollTop;
            }, 500, () => {
                element.scrollTop = offsetTop;
            });
        }

    } else {
        element.scrollTop = 0;
    }

};
