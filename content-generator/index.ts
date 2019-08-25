import path from 'path';

import fs from 'fs-extra';
import marked from 'marked';
import glob from 'glob-promise';
import matter from 'gray-matter';

const generate = async () => {
    console.log('Generating...');

    const articlesMdFiles = await glob('content/blog/**/*.md');
    const x = articlesMdFiles.map(f => ({ content: fs.readFileSync(f, 'utf-8'), filename: f }));
    const articles = x.map(c => {
        const qwe = matter(c.content, { excerpt: false });

        // if (qwe.data.published === false) {
        //     console.log(qwe);
        // }

        return {
            // ...qwe,
            // filename: c.filename,
            published: qwe.data.published !== false,
            title: qwe.data.title,
            content: marked(qwe.content),
            abstract: qwe.data.abstract as string,
            tags: qwe.data.tags as string[],
            date: qwe.data.date as Date,
            slug: path.basename(c.filename, '.md'),
        };
    });

    const publishedArticles = articles.filter(a => a.published);
    // const notPublishedArticles = articles.filter(a => !a.published);
    // console.log(notPublishedArticles);

    // console.log(articles);
};

generate();
