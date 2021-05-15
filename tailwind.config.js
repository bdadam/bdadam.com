console.log(123, process.env.NODE_ENV);

module.exports = {
    // purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
    purge: {
        // enabled: true,
        // enabled: false,
        enabled: process.env.NODE_ENV === 'production',
        mode: 'all',
        content: ['./src/**/*.tsx'],
    },
    theme: {},
    variants: {},
    plugins: [],
};
