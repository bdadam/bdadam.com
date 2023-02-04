import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function get(context: any) {
    const blog = await getCollection('blog');

    return rss({
        title: 'Adam Beres-Deak',
        description: 'TODO',
        site: 'https://bdadam.com/',
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: new Date(2023, 0, 1),
            // pubDate: post.data.pubDate,
            description: 'post.data.description',
            link: `/blog/${post.slug}.html`,
        })),
    });
}
