import path from 'path';

import fs from 'fs-extra';
import marked from 'marked';
import glob from 'glob-promise';
import matter from 'gray-matter';
import { sortBy, take } from 'lodash';
import { format } from 'date-fns';
import speakingurl from 'speakingurl';

const formatDate = (d: Date) => format(d, 'do MMMM yyyy');

const convert = async () => {
    console.log('Converting...');

    const articlesMdFiles = await glob('content/blog/**/*.md');
    const x = articlesMdFiles.map(f => ({ content: fs.readFileSync(f, 'utf-8'), filename: f }));
    const articlesUnsorted = x.map(c => {
        const { data, content } = matter(c.content, { excerpt: false });

        // const s = speakingurl(data.title);
        // if (s !== path.basename(c.filename, '.md')) {
        //     console.log(c.filename, s);
        // }

        return {
            published: data.published !== false,
            title: data.title,
            // content: marked(content),
            content,
            abstract: data.abstract as string,
            tags: data.tags as string[],
            date: new Date(data.date),
            slug: path.basename(c.filename, '.md'),
        };
    });

    const articles = sortBy(articlesUnsorted, 'date')
        .reverse()
        .map(a => ({ ...a, date: a.date ? format(a.date, 'yyyy-mm-dd HH:MM:SS') : '' }));

    fs.ensureDirSync('content-converted/blog');

    articles.map(article => {
        const s = matter.stringify(article.content, {
            title: article.title,
            slug: article.slug || '',
            date: article.date || '',
            abstract: article.abstract,
            tags: article.tags || [],
        });

        fs.writeFileSync(`content-converted/blog/${article.slug}.md`, s);
    });

    // const publishedArticles = articles.filter(a => a.published);

    // fs.ensureDirSync('webapp/static/data/blog');

    // const home = {
    //     latestArticles: take(publishedArticles, 5).map(a => {
    //         return {
    //             title: a.title,
    //             abstract: a.abstract,
    //             date: a.date,
    //             url: `/blog/${a.slug}/`,
    //         };
    //     }),
    // };

    // fs.writeJSONSync(`webapp/static/data/index.json`, home);

    // publishedArticles.map(article => {
    //     const json = { ...article };
    //     fs.writeJSONSync(`webapp/static/data/blog/${article.slug}.json`, json);
    // });

    console.log('Done.');
};

convert();
