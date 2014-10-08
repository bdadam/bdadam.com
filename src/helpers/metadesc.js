module.exports.register = function (Handlebars, options, params)  {
    Handlebars.registerHelper('metadesc', function(context, options) {
        return new Handlebars.SafeString((context || '').substring(0, 150));
    });
};