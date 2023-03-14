//@ts-check

import path from 'path';
import glob from 'glob';

import { describe, expect, it } from 'vitest';

import cheerio from 'cheerio';
import { readFileSync } from 'fs';

expect.extend({
    toStartWith(received, expected) {
        // return received.startsWith(expected);
        return {
            pass: received.startsWith(expected),
            message: () => `${receiv}`,
        };
    },
});

describe('Site Checks', async () => {
    const x = new URL('', import.meta.url);
    const distDir = path.resolve(path.dirname(x.pathname), '../dist');
    const htmlFiles = await glob('**/*.html', {
        cwd: distDir,
        ignore: ['**/og/**', '**/article-assets/**', '**/demo/**', '**/samples/**', '**/admin/**'],
    });

    htmlFiles.forEach((file) =>
        describe(`${file}`, () => {
            const content = readFileSync(path.resolve('../dist', file), 'utf-8');
            const $ = cheerio.load(content, null, false);

            it('has proper link[rel=canonical]', () => {
                const canonical = $('link[rel=canonical]').attr('href');

                expect(canonical, 'Canonical').toSatisfy((c) => {
                    return c.startsWith('https://bdadam.com/') && c.endsWith(file);
                });
            });

            it('has proper title tag', () => {
                const title = $('head title').text();

                expect(title).toSatisfy((t) => {
                    return t.length >= 20 && t.length <= 120;
                });
            });

            it('has proper meta[name=description]', () => {
                const description = $('meta[name=description]').text();

                expect(description).toSatisfy((d) => {
                    return d.length >= 60 && d.length <= 150;
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
        })
    );

    describe('Sitemap Index', async () => {
        const sitemapIndexXml = readFileSync('../dist/sitemap-index.xml', 'utf-8');
        const $ = cheerio.load(sitemapIndexXml);

        it('is xml', () => {
            expect(sitemapIndexXml).toMatch(
                new RegExp(
                    '^<\\?xml version="1.0" encoding="UTF-8"\\?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                )
            );
        });

        it('points to sitemap-0.xml file', () => {
            expect($('sitemap loc').length).toEqual(1);
            expect($('sitemap loc').text()).toEqual('https://bdadam.com/sitemap-0.xml');
        });
    });

    describe('Sitemap', async () => {
        const sitemapXml = readFileSync('../dist/sitemap-0.xml', 'utf-8');
        const $ = cheerio.load(sitemapXml);

        it('is xml', () => {
            expect(sitemapXml).toMatch(
                new RegExp(
                    '<\\?xml version="1.0" encoding="UTF-8"\\?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">'
                )
            );
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

        it('has links to at least 40 pages', () => {
            expect($('url loc').length).toBeGreaterThan(40);
        });
    });

    describe('robots.txt', () => {
        const content = readFileSync('../dist/robots.txt', 'utf-8');

        it('exists', () => {
            expect(content).toBeDefined();
        });

        it('has link to sitemap xml', () => {
            expect(content).toContain('Sitemap: https://bdadam.com/sitemap-index.xml');
        });
    });
});
