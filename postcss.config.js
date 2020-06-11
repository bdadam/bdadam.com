// const purgecss = [
//     '@fullhuman/postcss-purgecss',
//     {
//         content: ['./src/components/**/*.tsx', '.src//pages/**/*.tsx'],
//         defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
//         whitelist: ['html', 'body'],
//     },
// ];

module.exports = {
    plugins: [
        'postcss-import',
        'tailwindcss',
        'autoprefixer',
        // ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    ],
};
