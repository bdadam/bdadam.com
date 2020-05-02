#!/usr/bin/env -S npx ts-node --project tsconfig.tools.json
import fs from 'fs';

import RSS from 'rss';

import readArticles from '../services/read-articles';

const run = async () => {
    const articles = await readArticles();

    const feed = new RSS({
        site_url: 'https://bdadam.com/',
        feed_url: 'https://bdadam.com/rss.xml',
        title: 'Devblog of Adam Beres-Deak',
        description: 'Devblog',
    });

    articles.slice(0, 20).forEach((article) => {
        feed.item({
            title: article.title,
            description: `${article.intro.html}\n${article.body.html}`,
            url: `https://bdadam.com${article.url}`,
            date: article.date,
        });
    });

    // x.item({})

    const xml = feed.xml();

    fs.writeFileSync('public/rss2.xml', xml);
};

run();
