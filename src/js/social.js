var tracking = require('./tracking');

function addListener(element, type, callback) {
    element.addEventListener(type, callback);
}

module.exports = {
    buildShareButtons: function() {
        var shareBars = document.querySelectorAll('.share-bar');

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