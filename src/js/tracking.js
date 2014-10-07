module.exports = {
    trackEvent: function(category, action, label, value) {
        window.ga && window.ga('send', 'event', category, action, label, value);
    }
};