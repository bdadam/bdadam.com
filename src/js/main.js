require('./tracking').load();
require('./social').buildShareButtons();

function loadCss(url) {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadScript(src) {
    var s = document.createElement('script');
    s.async = true;
    s.src = src;
    var sc = document.getElementsByTagName('script')[0];
    sc.parentNode.insertBefore(s, sc);
}

loadCss('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css');
loadCss('http://yandex.st/highlightjs/8.0/styles/vs.min.css');
loadScript('http://yandex.st/highlightjs/8.0/highlight.min.js');

(function hlj() {
    if (typeof window.hljs === 'undefined') {
        return setTimeout(hlj, 100);
    }

    window.hljs.initHighlightingOnLoad();
}());
