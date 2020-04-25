import glob from 'glob-promise';

export async function get(req, res) {
    const articleSlugs = await glob('*.md', { cwd: 'content/blog' });
    const articleUrls = articleSlugs.map(u => `<url><loc>https://bdadam.com/blog/${u.replace('.md', '')}/</loc></url>`);

    res.set('Content-Type', 'application/xml');

    const x = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        '<url><loc>https://bdadam.com/</loc></url>',
        '<url><loc>https://bdadam.com/about/</loc></url>',
        '<url><loc>https://bdadam.com/blog/</loc></url>',
        ...articleUrls,
        '</urlset>',
    ];

    res.send(x.join('\n'));
}
