module.exports = {
    webpack: (config, options) => {
        config.resolve.alias = Object.assign({}, config.resolve.alias, {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
        });

        return config;
    },
};
