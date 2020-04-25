const { series, parallel } = require('gulp');

const spawn = require('child_process').spawn;
const fs = require('fs-extra');

exports.clean = async () => {
    fs.removeSync('dist');
    fs.ensureDirSync('dist');
};

const watcBuild = (exports.webpack = cb => {
    const webpack = require('webpack');
    const config = require('./webpack.config');

    // webpack(config).run((err, stats) => {
    webpack(config).watch({}, (err, stats) => {
        console.log(stats.toString({ colors: true, modules: false, entrypoints: false, hash: false, builtAt: false }));

        fs.copy('static', 'dist');
        const proc = spawn('node', ['dist/server.js']);
        proc.stdout.pipe(process.stdout);
    });
});

const serve = () => {
    const browserSync = require('browser-sync');

    browserSync({
        server: './dist',
        open: false,
        files: ['dist/**/*.html', 'dist/main*.css', 'dist/client*.js'],
        notify: false,
    });
};

exports.default = async () => {
    console.log('def');
};

// exports.dev = parallel(watcBuild, serve);
exports.dev = parallel(watcBuild);
