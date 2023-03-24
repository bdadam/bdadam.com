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
                image: `https://bdadam.com/og/blog/${post.slug}.png`,
            };
        });

    const articleUrls: string[] = sitemapData.map((item) => {
        if (new Date(item.formattedPublicationDate).getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000) {
            return `<url><loc>${item.url}</loc><image:image><image:loc>${item.image}</image:loc></image:image></url>`;
        }

        return `<url>
<loc>${item.url}</loc>
<image:image><image:loc>${item.image}</image:loc></image:image>
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
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        '<url><loc>https://bdadam.com/</loc><image:image><image:loc>https://bdadam.com/og/home.png</image:loc></image:image></url>',
        '<url><loc>https://bdadam.com/about.html</loc><image:image><image:loc>https://bdadam.com/og/home.png</image:loc></image:image></url>',
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
