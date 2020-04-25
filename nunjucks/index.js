const fs = require('fs');

const nunjucks = require('nunjucks');

const tpl = fs.readFileSync('nunjucks/tpl.html', 'utf-8');

// const fn = nunjucks.compile(tpl);

// const html = fn.render({ meta: { title: 'Title' }, content: 'CONTENT' });

// fs.writeFileSync('dist/index.html', html);

// const x = nunjucks.precompileString(tpl, { name: 'abc', asFunction: true });
// console.log(x);

const x = nunjucks.precompile('nunjucks/tpl.html', { name: 'index', asFunction: false });
console.log(x);
