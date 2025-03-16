//@ts-check

import path from 'path';
import { glob } from 'glob';

import { describe, expect, it } from 'vitest';

import * as cheerio from 'cheerio';
import { readFileSync, existsSync } from 'fs';

describe('Site Checks', async () => {
    const x = new URL('', import.meta.url);
    const distDir = path.resolve(path.dirname(x.pathname), '../dist');
    const htmlFiles = await glob('**/*.html', {
        cwd: distDir,
        ignore: ['**/og/**', '**/article-assets/**', '**/demo/**', '**/samples/**', '**/admin/**'],
    });

    it('has Home and About page', () => {
        expect(htmlFiles).toContain('index.html');
        expect(htmlFiles).toContain('about.html');
    });

    htmlFiles.forEach((file) => {
        const content = readFileSync(path.resolve('../dist', file), 'utf-8');
        const $ = cheerio.load(content);

        if ($('meta[name=robots]').attr('content')?.includes('noindex')) {
            console.log(`Article ignored due to noindex: ${file}`);
            return;
        }

        describe(`${file}`, () => {
            it('has proper link[rel=canonical]', () => {
                const canonical = $('link[rel=canonical]').attr('href');

                expect(canonical, 'Canonical').toSatisfy((c) => {
                    return c.startsWith('https://bdadam.com/') && c.endsWith(file.replace('index.html', ''));
                });
            });

            it('has proper title tag', () => {
                const title = $('html > head > title').text().trim();

                expect(title).toSatisfy((t) => {
                    return t.length >= 20 && t.length <= 120;
                });
            });

            it('has proper meta[name=description]', () => {
                const description = $('html > head > meta[name=description]').attr('content')?.trim();

                expect(description).toSatisfy((d) => {
                    // TODO: Fail when description too long
                    // return d.length >= 60 && d.length <= 150;
                    return d.length >= 60;
                });
            });

            it('has proper H1', () => {
                const h1 = $('h1').text().trim();

                expect(h1).toBeDefined();
                expect(h1.length).toBeGreaterThanOrEqual(20);
            });

            it('has site navigation', () => {
                // TODO: Check for `nav` element and links
                // const navigation = $('.site-header nav');
                const navigation = $('.site-header');
                expect(navigation).toHaveLength(1);
            });

            it('has an open graph image', () => {
                const image = /** @type {string} */ $('html head meta[property="og:image"]').attr('content');
                const width = $('html head meta[property="og:image:width"]').attr('content');
                const height = $('html head meta[property="og:image:height"]').attr('content');

                expect(image).toBeDefined();
                expect(image).toBeTypeOf('string');
                // TODO: check for image url to start with https://bdadam.com/og/
                expect(image).toMatch(/\/og\/.+\.png/);
                expect(parseInt(width ?? '')).toEqual(1200);
                expect(parseInt(height ?? '')).toEqual(630);
                expect(existsSync(path.resolve('../dist', image!.replace('/og', 'og')))).toEqual(true);
            });

            it('has JSON+LD', () => {
                const jsonld = JSON.parse($('script[type=application/ld+json]').text());
                expect(jsonld).toBeDefined();
                expect(jsonld.author ?? jsonld.publisher).toEqual({
                    '@type': 'Person',
                    name: 'Adam Beres-Deak',
                    url: 'https://bdadam.com/about.html',
                });
            });

            it('has html[lang=en]', () => {
                const htmlLang = $('html').attr('lang');
                expect(htmlLang).toEqual('en');
            });
        });
    });

    describe('Sitemap', async () => {
        const sitemapXml = readFileSync('../dist/sitemap.xml', 'utf-8');
        const $ = cheerio.load(sitemapXml);

        it('is xml', () => {
            expect(sitemapXml.startsWith('<?xml version="1.0" encoding="utf-8"?>')).toEqual(true);
            expect(sitemapXml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
        });

        it('has links to home', () => {
            const homeLink = $('url loc').filter((a, b) => {
                return $(b).text() === 'https://bdadam.com/';
            });

            expect(homeLink).toHaveLength(1);
        });

        it('has link to about page', () => {
            const aboutLink = $('url loc').filter((a, b) => {
                return $(b).text() === 'https://bdadam.com/about.html';
            });

            expect(aboutLink).toHaveLength(1);
        });

        it('has links to at least 38 pages', () => {
            expect($('url loc').length).toBeGreaterThanOrEqual(38);
        });
    });

    describe('robots.txt', () => {
        const content = readFileSync('../dist/robots.txt', 'utf-8');

        it('exists', () => {
            expect(content).toBeDefined();
        });

        it('has link to sitemap xml', () => {
            expect(content).toContain('Sitemap: https://bdadam.com/sitemap.xml');
        });
    });

    describe('Blog migration 2023', () => {
        it('All articles are migrated', () => {
            const oldArticles = [
                'blog/displaying-icons-with-custom-elements.html',
                'blog/plain-javascript-event-delegation.html',
                'blog/first-year-of-blogging.html',
                'blog/better-webfont-loading-with-localstorage-and-woff2.html',
                'blog/video-douglas-crockford-about-the-new-good-parts.html',
                'blog/automatically-adapting-the-height-textarea.html',
                'blog/loading-webfonts-with-high-performance.html',
                'blog/optimistic-page-loading-with-instantclick-io.html',
                'blog/generating-sound-effects-with-client-side-javascript.html',
                'blog/static-site-generation-boilerplate.html',
                'blog/automatically-loading-grunt-tasks-with-matchdep.html',
                'blog/simple-usability-trick-for-google-maps.html',
                'blog/switching-background-color-with-gimp.html',
                'blog/panning-and-scrolling-background-images-using-the-canvas-element.html',
                'blog/finding-a-random-document-in-mongodb.html',
                'blog/tracking-clicks-with-google-analytics.html',
                'blog/comparison-helper-for-handlebars.html',
                'blog/strange-error-when-installing-npm-package-globally-on-ubuntu.html',
                'blog/defining-properties-in-javascript.html',
                'blog/playing-mario-in-the-browser.html',
                'blog/building-desktop-apps-with-node-js-and-web-technologies.html',
                'blog/how-to-redirect-www-to-naked-domain-and-vice-versa-with-nginx.html',
                'blog/how-to-register-a-bower-package.html',
                'blog/demistifying-angularjs-dependency-injection.html',
                'blog/hosting-static-web-pages-and-assets-with-google-drive.html',
                'blog/strong-caching-with-nginx.html',
                'blog/error-handling-in-javascript.html',
                'blog/adding-tab-support-to-textareas.html',
                'blog/serve-a-practical-command-line-webserver.html',
                'blog/fat-arrows-for-javascript.html',
                'blog/why-i-chose-a-statically-generated-website.html',
                'blog/a-simple-pubsub-module-in-javascript.html',
                'blog/wow-i-started-a-blog.html',
            ];

            oldArticles.forEach((f) => {
                expect(htmlFiles).toContain(f);
            });
        });
    });
});
