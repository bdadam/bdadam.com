module.exports = {
    load: function() {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        if (location.hostname !== 'localhost') {
            ga('create', 'UA-47485340-1', 'bdadam.com');
            ga('send', 'pageview');

            ga('create', 'UA-49233936-1', 'bdadam.com', { name: 'x'});
            ga('x.send', 'pageview');
        }
    },
    trackEvent: function(category, action, label, value) {
        window.ga && window.ga('send', 'event', category, action, label, value);
    }
};