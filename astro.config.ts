import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkToc from 'remark-toc';
// import compress from 'astro-compress';
import xremarkDefinitionList, { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkEmoji from 'remark-emoji';
import remarkCodeTitle from 'remark-code-title';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFlexibleContainers from 'remark-flexible-containers';

import puppeteer from 'puppeteer';
import path from 'path';
import glob from 'glob';

import { remarkReadingTime } from './src/plugins/remark-reading-time';

export default defineConfig({
    integrations: [
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
        extendDefaultPlugins: true,
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: 'prepend', content: {}, properties: { className: 'heading-anchor' } }],
        ],
        remarkPlugins: [
            remarkReadingTime,

            //@ts-ignore
            [remarkEmoji, { accessible: true }],
            remarkCodeTitle,
            remarkFlexibleContainers,
            [remarkToc, {}],
            remarkDefinitionList,
        ],
        shikiConfig: {
            // Choose from Shiki's built-in themes (or add your own)
            // https://github.com/shikijs/shiki/blob/main/docs/themes.md
            // theme: 'dracula',
            // theme: 'one-dark-pro',
            // theme: 'dark-plus',
            // theme: 'one-dark-pro',
            /*
              | 'rose-pine-dawn'
  | 'rose-pine-moon'
  | 'rose-pine'
  | 'slack-dark'
  | 'slack-ochin'
            */
            theme: 'slack-dark',
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
