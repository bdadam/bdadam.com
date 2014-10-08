var tracking = require('./tracking');

var links = [
    '<a class="btn-share fb" href="https://www.facebook.com/sharer/sharer.php?u=##url##" target="_blank"><i class="fa fa-facebook"></i> Share</a>',
    '<a class="btn-share tw" href="http://twitter.com/share?url=##url##" target="_blank"><i class="fa fa-twitter"></i> Tweet</a>',
    '<a class="btn-share gp" href="https://plus.google.com/share?url=##url##" target="_blank"><i class="fa fa-google-plus"></i> Share</a>',
    '<a class="btn-share li" href="http://www.linkedin.com/shareArticle?mini=true&url=##url##" target="_blank"><i class="fa fa-linkedin"></i> Share</a>',
    '<a class="btn-share cm" href="#comments"><i class="fa fa-comment"></i> Comment</a>'
];

function buildShareBar(el) {
    var encodedHref = encodeURIComponent(document.location.href.replace(document.location.search, ""));
    var html = '';

    for (var  i = 0, l = links.length; i < l; i++) {
        var link = links[i];
        html += link.replace('##url##', encodedHref);
    }

    el.innerHTML = html;
}

function addListener(element, type, callback) {
    element.addEventListener(type, callback);
}

module.exports = {
    buildShareButtons: function() {
        var shareBars = document.querySelectorAll('.share-bar');

        for (var i = 0, l = shareBars.length; i < l; i++) {
            buildShareBar(shareBars[i]);
        }

        var btns = document.querySelectorAll('.btn-share');
        for (var i = 0, l = btns.length; i < l; i++) {
            var btn = btns[i];
            addListener(btn, 'click', function() {
                var network = this.className.replace('btn-share ', '');
                tracking.trackEvent('Social', 'Share', network);
            });
        }
    }
};