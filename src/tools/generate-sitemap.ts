import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';

export default async function (paths: string[]) {
    const pathsWithoutOgImages = paths.filter((p) => !p.startsWith('og/'));
    const pathsWithHtmlExtension = pathsWithoutOgImages.map((p) => {
        if (p === '' || p.endsWith('.html')) {
            return p;
        }

        return p + '.html';
    });

    const pathsWithHtmlExtensionFiltered = pathsWithHtmlExtension.filter((p) => {
        if (!p.endsWith('.html')) {
            return true;
        }
        const content = readFileSync(path.resolve('dist', p), 'utf-8');

        return !content.includes('<meta name="robots" content="noindex">');
    });

    const articleUrls = pathsWithHtmlExtensionFiltered.map((p) => `<url><loc>https://bdadam.com/${p}</loc></url>`);

    const x = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...articleUrls,
        '</urlset>',
    ];

    await writeFile('dist/sitemap.xml', x.join('\n'));
}
