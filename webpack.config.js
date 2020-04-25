const path = require('path');

const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const common = {
    devtool: 'source-map',
    mode: 'production',
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    optimization: {
        // minimize: false,
        minimize: true,
    },
};

module.exports = [
    {
        ...common,
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 3000,
            injectHot: true,
        },
        target: 'web',
        entry: './svelte/client.js',
        output: {
            path: path.resolve('dist/assets'),
            filename: 'client.[contenthash].js',
            publicPath: '/assets/',
            // libraryTarget: 'umd',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // you can specify a publicPath here
                                // by default it uses publicPath in webpackOptions.output
                                // publicPath: '../',
                                // hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader',
                    ],
                },
                {
                    test: /\.(svelte)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            generate: 'dom',
                            hydratable: true,
                        },
                    },
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].css',
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            }),
            new ManifestPlugin(),
            // new CopyPlugin([{ from: 'static/', to: 'dist' }]),
            new HtmlWebpackPlugin({ filename: 'template.html', template: 'svelte/page-template.html', inject: false }),
            // new HtmlWebpackPlugin({ filename: 'template.html' }),
        ],
    },
    {
        ...common,
        target: 'node',
        externals: [nodeExternals()],
        entry: './svelte/server.js',
        output: {
            path: path.resolve('dist'),
            filename: 'server.js',
            libraryTarget: 'commonjs',
        },

        module: {
            rules: [
                {
                    test: /\.(svelte)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            css: false,
                            generate: 'ssr',
                            hydratable: true,
                            preserveWhitespace: true,
                        },
                    },
                },
            ],
        },
    },
];
