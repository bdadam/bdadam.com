'use strict';

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
    hljs.configure({
        tabReplace: '    ',
        classPrefix: ''
    });

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
    loadJS('//yandex.st/highlightjs/8.0/highlight.min.js', startCodeHighlighting);

    var disqusHasToLoad = !!document.getElementById('comments');

    if (disqusLoaded && disqusHasToLoad) {
        window.DISQUS && document.getElementById('comments') && window.DISQUS.reset({ reload: true });
    }

    function loadDisqus() {
        if (window.pageYOffset === 0) {
            window.addEventListener('scroll', function x() {
                loadJS('//' + disqus_shortname + '.disqus.com/embed.js');
                window.removeEventListener('scroll', x);
            });

        } else {
            loadJS('//' + disqus_shortname + '.disqus.com/embed.js');
        }
    }

    if (!disqusLoaded && disqusHasToLoad) {
        window.disqus_shortname = 'bdadamcom';
        loadDisqus();
        disqusLoaded = true;
    }
});

ic.init();
