const withPreact = require('next-plugin-preact');

module.exports = withPreact({
    //
});

// const withPrefresh = require('@prefresh/next');
// const path = require('path');

// const config = {
//     experimental: {
//         modern: true,
//         polyfillsOptimization: true,
//     },

//     webpack(config, { dev, isServer, ...rest }) {
//         const splitChunks = config.optimization && config.optimization.splitChunks;
//         if (splitChunks) {
//             const cacheGroups = splitChunks.cacheGroups;
//             const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
//             if (cacheGroups.framework) {
//                 cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
//                     test: preactModules,
//                 });
//                 cacheGroups.commons.name = 'framework';
//             } else {
//                 cacheGroups.preact = {
//                     name: 'commons',
//                     chunks: 'all',
//                     test: preactModules,
//                 };
//             }
//         }

//         // Install webpack aliases:
//         const aliases = config.resolve.alias || (config.resolve.alias = {});
//         aliases.react = aliases['react-dom'] = 'preact/compat';
//         aliases.preact = path.resolve(__dirname, 'node_modules', 'preact');

//         if (dev && !isServer) {
//             const entry = config.entry;
//             // inject Preact DevTools
//             config.entry = () =>
//                 entry().then((entries) => {
//                     entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || []);
//                     return entries;
//                 });
//         }

//         return config;
//     },
// };

// module.exports = withPrefresh(config);

// // module.exports = {
// //     // webpack: (config, options) => {
// //     //     config.resolve.alias = Object.assign({}, config.resolve.alias, {
// //     //         react: 'preact/compat',
// //     //         'react-dom/test-utils': 'preact/test-utils',
// //     //         'react-dom': 'preact/compat',
// //     //     });
// //     //     return config;
// //     // },

// //     // experimental: {
// //     //     modern: true,
// //     //     polyfillsOptimization: true,
// //     // },

// //     webpack(config, { dev, isServer }) {
// //         const splitChunks = config.optimization && config.optimization.splitChunks;
// //         if (splitChunks) {
// //             const cacheGroups = splitChunks.cacheGroups;
// //             const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
// //             if (cacheGroups.framework) {
// //                 cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
// //                     test: preactModules,
// //                 });
// //                 cacheGroups.commons.name = 'framework';
// //             } else {
// //                 cacheGroups.preact = {
// //                     name: 'commons',
// //                     chunks: 'all',
// //                     test: preactModules,
// //                 };
// //             }
// //         }

// //         // Install webpack aliases:
// //         const aliases = config.resolve.alias || (config.resolve.alias = {});
// //         aliases.react = aliases['react-dom'] = 'preact/compat';

// //         // inject Preact DevTools
// //         if (dev && !isServer) {
// //             const entry = config.entry;
// //             config.entry = () =>
// //                 entry().then((entries) => {
// //                     entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || []);
// //                     return entries;
// //                 });
// //         }

// //         return config;
// //     },
// // };