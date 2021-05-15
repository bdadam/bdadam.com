import typescript from '@rollup/plugin-typescript';
import typescript2 from 'rollup-plugin-typescript2';
import jsx from 'acorn-jsx';
import postcss from 'rollup-plugin-postcss';
import outputManifest from 'rollup-plugin-output-manifest';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
// import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import builtins from 'builtin-modules';
import run from '@rollup/plugin-run';
import externals from 'rollup-plugin-node-externals';

const dev = process.env.ROLLUP_WATCH === 'true';

// console.log(dev);

/** @type {import('rollup').RollupOptions} */
const serverConfig = {
    // input: ['src/client-x.ts', 'src/client/index.ts', 'src/server.ts'],
    input: 'src/server/index.ts',
    output: {
        dir: 'dist/server',
        format: 'cjs',
    },
    // acornInjectPlugins: [jsx()],
    external: builtins.concat(['d3', 'lodash', 'fs-extra', 'gray-matter', 'depd', 'express']),
    plugins: [
        externals({
            deps: true,
        }),
        resolve({ preferBuiltins: true, extensions: ['.js', '.ts', '.tsx'] }),
        commonjs(),
        json(),
        // typescript({}),
        typescript2({
            tsconfig: 'tsconfig.json',
        }),
        // babel({
        //     extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
        //     babelHelpers: 'bundled',
        //     presets: [
        //         //     // ['@babel/env', { modules: false }],
        //         ['@babel/env', { targets: { node: '13' }, modules: false }],
        //         ['@babel/preset-typescript'],
        //         // '@babel/preset-react',
        //         'preact',
        //     ],
        // }),
        // terser(),
        postcss({
            // extract: true,
            minimize: !dev,
        }),
        outputManifest(),
        dev && run({ cwd: process.cwd() }),
    ],
};

/** @type {import('rollup').RollupOptions} */
const clientConfig = {
    input: './src/client/index.ts',
    output: {
        format: 'iife',
        dir: 'dist/client',
    },
    plugins: [
        // postcss({
        //     extract: true,
        //     minimize: !dev,
        // }),
    ],
};

export default [serverConfig, clientConfig];
// export default [serverConfig];
