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

loadCss('//fonts.googleapis.com/css?family=Open+Sans:400,700');
loadCss('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css');
loadCss('http://yandex.st/highlightjs/8.0/styles/vs.min.css');
loadScript('http://yandex.st/highlightjs/8.0/highlight.min.js');

function addEventListener(obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);
    }
    else if (obj.attachEvent) {
        obj.attachEvent(event, fn);
    }
}

addEventListener(window, 'load', function() {
    (function hlj() {
        if (typeof window.hljs === 'undefined') {
            return setTimeout(hlj, 100);
        }

        var blocks = document.querySelectorAll('pre code');//.each(function(i, e) {hljs.highlightBlock(e)});
        for (var i = 0, l = blocks.length; i < l; i++) {
            hljs.highlightBlock(blocks[i]);
        }
    }());
});
