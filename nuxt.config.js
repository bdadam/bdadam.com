export default {
    head: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
    css: ['~/styles/global.less', '@fortawesome/fontawesome-svg-core/styles.css'],
    generate: {
        subFolders: false,
        routes: ['/blog/', '/blog/abcd.html', '/blog/abcd-qwwqe-qwedsf.html'],
    },
    plugins: ['~/plugins/fontawesome.js'],
    modules: ['@nuxtjs/sitemap'],
    sitemap: {
        hostname: 'https://bdadam.com',
    },
};
