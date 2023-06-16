import { defineConfig } from 'astro/config';
import remarkToc from 'remark-toc';
import compress from 'astro-compress';
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import remarkEmoji from 'remark-emoji';
import remarkCodeTitle from 'remark-code-title';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkFlexibleContainers from 'remark-flexible-containers';
import { remarkReadingTime } from './src/plugins/remark-reading-time';
import generateOgImages from './src/tools/generate-og-images';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import { resolve, join } from 'path';
import CleanCSS from 'clean-css';
import htmlMinifier from 'html-minifier';
import UnoCSS from 'unocss/astro';

export default defineConfig({
    integrations: [
        UnoCSS({
            injectReset: false,
        }),
        {
            name: 'Generate screenshots',
            hooks: {
                'astro:build:done': async ({ pages }) => {
                    await generateOgImages();
                },
            },
        },
        {
            name: 'Minify HTML, inline CSS',
            hooks: {
                'astro:build:done': async ({ dir }) => {
                    const x = await glob('**/*.html', { cwd: dir.pathname });

                    const assets = new Map<string, string>();

                    x.map((f) => join('./dist/', f))
                        .filter((f) => !/\/og\//.test(f))
                        .forEach((htmlPath) => {
                            const content = readFileSync(htmlPath, 'utf-8');

                            const $ = cheerio.load(content);
                            const links = $('link[rel="stylesheet"]');
                            for (const l of links) {
                                const q = l.attribs['href'];

                                if (q.startsWith('https://')) {
                                    continue;
                                }

                                const assetPath = join('./dist', q);

                                const minifiedCss =
                                    assets.get(assetPath) ??
                                    new CleanCSS({}).minify(readFileSync(join('./dist', q), 'utf-8')).styles;

                                assets.set(assetPath, minifiedCss);

                                $(l).replaceWith($(`<style>${minifiedCss}</style>`));
                            }

                            // const scripts = $('script[src]');
                            // for (const script of scripts) {
                            //     const src = script.attribs['src'];

                            //     if (src.startsWith('https://')) {
                            //         continue;
                            //     }

                            //     const assetPath = join('./dist', src);
                            //     console.log({ assetPath });
                            // }

                            const f = htmlMinifier.minify($.html(), {
                                collapseBooleanAttributes: true,
                                collapseWhitespace: true,
                                decodeEntities: true,
                                removeComments: true,
                                removeScriptTypeAttributes: true,
                            });

                            writeFileSync(htmlPath, f);
                            console.log(`Minified ${htmlPath}`);
                        });
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
        remarkRehype: {
            // @ts-ignore
            handlers: defListHastHandlers,
        },
        rehypePlugins: [
            rehypeSlug,
            [
                rehypeAutolinkHeadings,
                {
                    behavior: 'prepend',
                    content: {},
                    properties: { className: 'heading-anchor', ariaHidden: 'true', tabIndex: -1 },
                },
            ],
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
