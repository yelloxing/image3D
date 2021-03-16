import fixedScroll from './fixedScroll';

export default function (fixedName) {
    window.location.href = (window.location.href + "").replace(/\?fixed=.*$/, '') + "?fixed=" + fixedName;
    fixedScroll();
};
