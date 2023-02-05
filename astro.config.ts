import { defineConfig } from 'astro/config';
// import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
import compress from 'astro-compress';

import { remarkReadingTime } from './src/plugins/remark-reading-time';

// https://astro.build/config
export default defineConfig({
    integrations: [
        // react(),
        // tailwind(),
        sitemap(),
        {
            name: 'Test',
            hooks: {
                'astro:config:setup': ({ injectScript }) => {
                    injectScript('page-ssr', 'import "src/styles/abc.css";');
                },
            },
        },
        // compress({
        //     css: true,
        //     html: true,
        // }),
    ],
    server: {
        host: '0.0.0.0',
    },
    trailingSlash: 'never',
    build: {
        format: 'file',
    },
    site: 'https://bdadam.com/',
    markdown: {
        remarkPlugins: [remarkReadingTime, () => remarkToc({})],
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            // theme: 'dracula',
            // theme: 'one-dark-pro',
            theme: 'dark-plus',
            // theme: 'github-light',
            // Add custom languages
            // Note: Shiki has countless langs built-in, including .astro!
            // https://github.com/shikijs/shiki/blob/main/docs/languages.md
            // langs: [],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true,
        },
    },
});
