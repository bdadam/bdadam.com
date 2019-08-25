export default {
    srcDir: 'webapp',
    head: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
        link: [
            // {
            //     rel: 'stylesheet',
            //     // href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=optional&subset=latin-ext',
            //     href: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap&subset=latin-ext',
            //     // href: 'https://fonts.googleapis.com/css?family=Quicksand:400,700&display=swap&subset=latin-ext',
            // },
        ],
    },
    css: ['~/styles/global.less', '@fortawesome/fontawesome-svg-core/styles.css'],
    generate: {
        // subFolders: false,
        routes: ['/blog/abcd/', '/blog/abcd-qwwqe-qwedsf/'],
    },
    plugins: ['~/plugins/fontawesome.js'],
    modules: ['@nuxtjs/sitemap'],
    sitemap: {
        hostname: 'https://bdadam.com',
    },
};
