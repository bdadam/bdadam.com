import RSS from 'rss';

import readAllArticles from '../helpers/readAllArticles';

export async function get(req, res) {
    res.set('Content-Type', 'application/rss+xml');

    const articles = await readAllArticles();

    articles.length = 10;

    const feed = new RSS({
        title: 'Adam Beres-Deak',
        description: 'Blog',
        site_url: 'https://bdadam.com/',
        feed_url: 'https://feeds.feedburner.com/bdadamcom',
        image_url: '', // TODO
    });

    articles.forEach(article => {
        feed.item({
            title: article.title,
            description: `<div class="article-abstract">${article.abstract}</div><div class="article-content">${article.content}</div>`,
            url: `https://bdadam.com${article.url}`,
            author: 'Adam Beres-Deak',
        });
    });

    res.send(feed.xml({ indent: true }));
}
