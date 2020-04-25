// const withPreact = require('@zeit/next-preact');
// module.exports = withPreact({
/* config options here */
// });

module.exports = {
    webpack: (config, options) => {
        // config.module.rules.push({
        //     test: /\.mdx/,
        //     use: [
        //         options.defaultLoaders.babel,
        //         {
        //             loader: '@mdx-js/loader',
        //             options: pluginOptions.options,
        //         },
        //     ],
        // });

        config.resolve.alias = Object.assign({}, config.resolve.alias, {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
        });

        return config;
    },
};
