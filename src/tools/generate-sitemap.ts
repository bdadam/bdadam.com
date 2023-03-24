import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

export default async function (paths: string[]) {
    const sitemapDataString = readFileSync('dist/sitemap-data.json', 'utf-8');

    const sitemapData = JSON.parse(sitemapDataString) as Array<{
        title: string;
        formattedPublicationDate: string;
        url: string;
    }>;

    const articleUrls: string[] = sitemapData.map((item) => {
        if (new Date(item.formattedPublicationDate).getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000) {
            return `<url><loc>https://bdadam.com/${item.url}</loc></url>`;
        }

        return `<loc>${item.url}</loc>
<news:news>
<news:publication>
<news:name>Adam Beres-Deak</news:name>
<news:language>en</news:language>
</news:publication>
<news:publication_date>${item.formattedPublicationDate}</news:publication_date>
<news:title>${item.title}</news:title>
</news:news>`;
    });

    const sitempLines = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '<url><loc>https://bdadam.com/</loc></url>',
        '<url><loc>https://bdadam.com/about.html</loc></url>',
        ...articleUrls,
        '</urlset>',
    ];

    await writeFile('dist/sitemap.xml', sitempLines.join('\n'));
}
