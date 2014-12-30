module.exports.register = function (Handlebars, options, params)  {
    Handlebars.registerHelper('useicon', function(context, options) {
    	var str = '<svg class="icon-' + context + '"><use xlink:href="#icon-' + context + '"></use></svg>';
        return new Handlebars.SafeString(str);
    });
};
