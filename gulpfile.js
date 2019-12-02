const fs = require('fs-extra');
const less = require('less');
const browserSync = require('browser-sync').create();

const { watch, series, parallel } = require('gulp');

function clean(cb) {
    // body omitted
    cb();
}

async function js() {
    const babel = require('@babel/core');
    const x = await babel.transformFileAsync('./src/client/index.js', { sourceMaps: true });

    fs.writeFileSync('dist/main.js', `${x.code}\n\n//# sourceMappingURL=main.js.map`);
    fs.writeJSONSync('dist/main.js.map', x.map);
}

async function css() {
    const result = await less.render(fs.readFileSync('src/styles/main.less', 'utf-8'), {
        filename: 'src/styles/main.less',
        compress: true,
        sourceMap: true,
    });

    fs.writeFileSync('dist/main.css', `${result.css}\n\n/*# sourceMappingURL=main.css.map */`);
    fs.writeFileSync('dist/main.css.map', result.map);
}

async function copyStatic() {
    await fs.copy('static', 'dist', { recursive: true });
}

exports.js = js;
exports.css = css;
exports.clean = clean;

function serve() {
    browserSync.init({
        server: 'dist',
        notify: false,
        watch: true,
        open: false,
    });
}

require('ts-node').register({ respawn: true, watch: true });

async function generate() {
    const generator = require('./src/generator/index.ts');
    await generator.default();
}

async function watchFiles() {
    watch('static/**', copyStatic);
    watch('src/styles/**/*.less', series(css, generate));
    watch('src/client/**/*.js', series(js, generate));
    watch('src/views/**/*.html', generate);
    watch('content/**/*.md', generate);

    watch('src/generator/**/*.ts', async () => {
        const tskeys = Object.keys(require.cache).filter(x => x.includes('src/generator/'));
        tskeys.forEach(key => delete require.cache[key]);
        await generate();
    });
}

// exports.dev = async () => {
//     await Promise.all([
//         copyStatic(),
//         css(),
//         js(),
//         generate(),
//         //
//     ]);

//     watch('static/**', copyStatic);
//     watch('src/styles/**/*.less', series(css, generate));
//     watch('src/client/**/*.js', series(js, generate));
//     watch('src/views/**/*.html', generate);

//     watch('src/generator/**/*.ts', async () => {
//         const tskeys = Object.keys(require.cache).filter(x => x.includes('src/generator/'));
//         tskeys.forEach(key => delete require.cache[key]);
//         await generate();
//     });
// };

exports.build = series(parallel(copyStatic, css, js), generate);

exports.dev = series(exports.build, watchFiles, serve);

exports.default = exports.build;
