import type { APIRoute } from 'astro';

import { getCollection } from 'astro:content';

export const get: APIRoute = async function get() {
    const blogPosts = await getCollection('blog');
    const sitemapData = blogPosts
        .filter((post) => post.data.published !== false)
        .map((post) => {
            return {
                url: `https://bdadam.com/blog/${post.slug}.html`,
                title: post.data.title,
                formattedPublicationDate: new Date(post.data.date).toISOString().substring(0, 10),
            };
        });

    const articleUrls: string[] = sitemapData.map((item) => {
        if (new Date(item.formattedPublicationDate).getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000) {
            return `<url><loc>https://bdadam.com/${item.url}</loc></url>`;
        }

        return `<url>
<loc>${item.url}</loc>
<news:news>
<news:publication>
<news:name>Adam Beres-Deak</news:name>
<news:language>en</news:language>
</news:publication>
<news:publication_date>${item.formattedPublicationDate}</news:publication_date>
<news:title>${item.title}</news:title>
</news:news>
</url>`;
    });

    const sitempLines = [
        '<?xml version="1.0" encoding="utf-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">',
        '<url><loc>https://bdadam.com/</loc></url>',
        '<url><loc>https://bdadam.com/about.html</loc></url>',
        ...articleUrls,
        '</urlset>',
    ];

    return {
        headers: {
            'Content-Type': 'application/xml',
        },
        body: sitempLines.join('\n'),
    };
};
