var moment = require('moment');

module.exports.register = function (Handlebars, options, params)  {
    Handlebars.registerHelper('formatdate', function(context, options) {
        var format = options || 'DD MMMM YYYY';
        return new Handlebars.SafeString(moment(context).format(format));
    });
};