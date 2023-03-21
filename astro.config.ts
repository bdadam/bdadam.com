import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
// import compress from 'astro-compress';
import xremarkDefinitionList, { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkEmoji from 'remark-emoji';
import remarkCodeTitle from 'remark-code-title';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFlexibleContainers from 'remark-flexible-containers';
import { remarkReadingTime } from './src/plugins/remark-reading-time';
import generateOgImages from './src/tools/generate-og-images';
import generateSitemap from './src/tools/generate-sitemap';

export default defineConfig({
    integrations: [
        {
            name: 'Generate sitemap.xml',
            hooks: {
                'astro:build:done': async ({ pages }) => {
                    await generateSitemap(pages.map((p) => p.pathname));
                },
            },
        },
        {
            name: 'Generate screenshots',
            hooks: {
                'astro:build:done': async ({ pages }) => {
                    await generateOgImages();
                },
            },
        },
        // {
        //     name: 'Test',
        //     hooks: {
        //         'astro:config:setup': ({ injectScript }) => {
        //             injectScript('page-ssr', 'import "src/styles/abc.css";');
        //         },
        //     },
        // },
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
