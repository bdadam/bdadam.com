import type { APIRoute } from 'astro';

import { getCollection } from 'astro:content';

export const get: APIRoute = async function get({ params, request }) {
    const blogPosts = await getCollection('blog');

    const data = blogPosts
        .filter((post) => post.data.published !== false)
        .map((post) => {
            return {
                url: `https://bdadam.com/blog/${post.slug}.html`,
                title: post.data.title,
                formattedPublicationDate: new Date(post.data.date).toISOString().substring(0, 10),
            };
        });
    return {
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
};
