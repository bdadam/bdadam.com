import { defineConfig } from 'astro/config';
// import react from '@astrojs/react';
// import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
import remarkHint from 'remark-hint';
import remarkDirective from 'remark-directive';
import remarkCallouts from 'remark-callouts';
import compress from 'astro-compress';

import puppeteer from 'puppeteer';
import path from 'path';
import glob from 'glob-promise';

import { remarkReadingTime } from './src/plugins/remark-reading-time';

// https://astro.build/config
export default defineConfig({
    integrations: [
        // react(),
        // tailwind(),
        sitemap({
            filter: (page) => !page.includes('/og/'),
            serialize(item) {
                if (!item.url.endsWith('/')) {
                    item.url = item.url + '.html';
                }

                return item;
            },
        }),
        // {
        //     name: 'Test',
        //     hooks: {
        //         'astro:config:setup': ({ injectScript }) => {
        //             injectScript('page-ssr', 'import "src/styles/abc.css";');
        //         },
        //     },
        // },
        {
            name: 'Generate screenshots',
            hooks: {
                'astro:build:done': async ({ pages }) => {
                    const browser = await puppeteer.launch({ defaultViewport: { width: 1200, height: 630 } });
                    const page = await browser.newPage();

                    const files = await glob('./dist/og/**/*.html');

                    for (const file of files) {
                        const url = path.resolve(file);
                        await page.goto('file://' + url);
                        await page.screenshot({ path: file.replace('.html', '.png'), type: 'png' });
                    }

                    await browser.close();
                    console.log('Generated OG images.');
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
        remarkPlugins: [
            remarkReadingTime,
            remarkHint,
            remarkDirective,
            remarkCallouts,
            // () => {
            //     return (tree) => {
            //         visit(tree, (node) => {
            //             if (
            //                 node.type === 'textDirective' ||
            //                 node.type === 'leafDirective' ||
            //                 node.type === 'containerDirective'
            //             ) {
            //                 const data = node.data || (node.data = {});
            //                 const hast = h(node.name, node.attributes);

            //                 data.hName = hast.tagName;
            //                 data.hProperties = hast.properties;
            //             }
            //         });
            //     };
            // },
            () => remarkToc({}),
        ],
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
