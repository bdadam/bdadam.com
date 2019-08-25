import path from 'path';

import fs from 'fs-extra';
import marked from 'marked';
import glob from 'glob-promise';
import matter from 'gray-matter';

const generate = async () => {
    const articles = await glob('content/blog/**/*.md');
    const x = articles.map(f => ({ content: fs.readFileSync(f, 'utf-8'), filename: f }));
    const y = x.map(c => {
        const qwe = matter(c.content, { excerpt: false });
        return {
            ...qwe,
            filename: c.filename,
            content: marked(qwe.content),
            slug: path.basename(c.filename, '.md'),
        };
    });
    console.log(y);

    // console.log(articles);

    console.log('Generate');
};

generate();
