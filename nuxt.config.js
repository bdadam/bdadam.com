export default {
    head: {
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
    css: ['~/styles/global.less'],
    generate: {
        subFolders: false,
        routes: ['/blog/', '/blog/abcd.html', '/blog/abcd-qwwqe-qwedsf.html'],
    },
    modules: [
        '@nuxtjs/sitemap',
        [
            'nuxt-fontawesome',
            {
                imports: [
                    {
                        set: '@fortawesome/free-solid-svg-icons',
                        icons: ['fas'],
                    },
                    {
                        set: '@fortawesome/free-brands-svg-icons',
                        icons: ['fab'],
                    },
                ],
            },
        ],
    ],
    sitemap: {
        hostname: 'https://bdadam.com',
    },
};
