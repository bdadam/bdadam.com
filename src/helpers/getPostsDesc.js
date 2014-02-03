var _ = require('underscore');

module.exports.register = function (Handlebars, options, params)  {
    Handlebars.registerHelper('filterPostsDesc', function(context, options) {

        context = _.filter(context, function(item) {
            return item.src.indexOf('/blog/') >= 0 && item.data.layout === 'post.hbs';
        });

        context = _.sortBy(context, function(post) {
            return -Date.parse(post.data.date);
        });

        var ret = "";

        for(var i=0, j=context.length; i<j; i++) {
            var item = context[i];
            item.last = i === j - 1;
            ret = ret + options.fn(item);
        }

        return ret;
    });
};