var fs = require('fs');
var util = require('util');

var files = [{
	filename: 'Source Sans Pro Regular.woff',
	name: 'Source Sans Pro',
	'font-weight': '400',
	'font-style': 'normal'
}, {
	filename: 'Source Sans Pro Semibold.woff',
	name: 'Source Sans Pro Semibold',
	'font-weight': '600',
	'font-style': 'normal'
}];

var fontCssFile = '../../dist/static/source-sans-pro.woff.css';

fs.writeFileSync(fontCssFile, '');

files.forEach(function(x) {
	var b64 = fs.readFileSync(x.filename).toString('base64');
	var format = '@font-face{font-family:%s;src:local("%s"),url(data:application/x-font-woff;charset=utf-8;base64,%s) format("woff");font-weight:%s;font-style:%s}\n';
	var css = util.format(format, x.name, x.name, b64, x['font-weight'], x['font-style']);

	fs.appendFileSync(fontCssFile, css);
});
