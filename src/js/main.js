'use strict';

function loadCSS(e,t,n){"use strict";var i=window.document.createElement("link");var o=t||window.document.getElementsByTagName("script")[0];i.rel="stylesheet";i.href=e;i.media="only x";o.parentNode.insertBefore(i,o);setTimeout(function(){i.media=n||"all"})}

function loadJS( src, cb ){
    "use strict";
    var ref = window.document.getElementsByTagName( "script" )[ 0 ];
    var script = window.document.createElement( "script" );
    script.src = src;
    ref.parentNode.insertBefore( script, ref );
    if (cb) {
        script.onload = cb;
    }
    return script;
}

function startCodeHighlighting() {
    var blocks = document.querySelectorAll('pre code');
    for (var i = 0, l = blocks.length; i < l; i++) {
        hljs.highlightBlock(blocks[i]);
    }
}

var disqusLoaded = false;

var ic = require('./instantclick');

ic.on('change', function(initialPageview) {

    require('./menu').setup();
    require('./social').buildShareButtons();

    loadCSS('//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css');
    loadCSS('http://yandex.st/highlightjs/8.0/styles/vs.min.css');
    loadJS('//yandex.st/highlightjs/8.0/highlight.min.js', startCodeHighlighting);

    var disqusHasToLoad = !!document.getElementById('comments');

    if (disqusLoaded && disqusHasToLoad) {
        window.DISQUS && document.getElementById('comments') && window.DISQUS.reset({ reload: true });
    }

    if (!disqusLoaded && disqusHasToLoad) {
        window.disqus_shortname = 'bdadamcom';
        loadJS('//' + disqus_shortname + '.disqus.com/embed.js');
        disqusLoaded = true;
    }
});

ic.init();
