import nunjucks from 'nunjucks';
import less from 'less';
import { string } from 'prop-types';
// import { minify } from 'html-minifier';

// env.addFilter(
//     'less',
//     (str: string, cb) => {
//         less.render(`@import "src/styles/${str}";`, { compress: true }).then(({ css }) =>
//             cb(null, `<style>${css}</style>`)
//         );
//     },
//     true
// );

// const x = env.render('article.html', { title: 'abcdefqwe' }, (a, b) => {
//     console.log(b);
// });

// import fs from 'fs-extra';

export default async <T>(file: string, context: T): Promise<string> => {
    const env = new nunjucks.Environment(new nunjucks.FileSystemLoader('src/views'), { noCache: true });

    env.addFilter('less', (str: string) => '');

    const ctx: any = {
        ...context,
    };

    const html = env.render(file, ctx as any);
    return html || '';
};

// export default async <T>(file: string, context: T): Promise<string> =>
//     new Promise((resolve, reject) => {
//         env.render(file, context as any, (err, html) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }

//             // resolve(minify(html || '', { conservativeCollapse: true, collapseWhitespace: true }));
//             resolve(html || '');
//         });
//     });
