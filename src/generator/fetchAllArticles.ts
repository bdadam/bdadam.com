import fs from 'fs-extra';
import glob from 'glob';
import matter from 'gray-matter';
import sortBy from 'lodash/sortBy';
import { format as formatDate } from 'date-fns';
// import speakingurl from 'speakingurl';

import parseMarkdown from './parseMarkdown';
// import { stringify } from 'querystring';

export type Article = {
    slug: string;
    url: string;
    canonical: string;
    title: string;
    date: Date;
    dateFormatted: string;
    intro: string;
    introHtml: string;
    body: string;
    bodyHtml: string;
    tags: string[];
};

type RawArticleMatter = {
    title: string;
    abstract: string;
    date: string;
    published: false | undefined;
    tags?: string[];
};

const readFile = (filename: string) => {
    const fileContent = fs.readFileSync(`content/blog/${filename}`, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
        filename,
        data: data as RawArticleMatter,
        content,
    };
};

// const filterDraftArticles = x => x.data.published !== false && x.data.abstract;

export default (): Article[] => {
    const articleFiles = glob.sync('*.md', { cwd: 'content/blog' });
    const articles = articleFiles
        .map(readFile)
        .filter(x => x.data.published !== false && x.data.abstract)
        .map(({ filename, data, content }) => {
            const date = new Date(data.date);
            const slug = filename.replace('.md', '.html');

            return {
                url: `/blog/${slug}`,
                canonical: `https://bdadam.com/blog/${slug}`,
                slug,
                title: data.title,
                date,
                dateFormatted: formatDate(date, 'do MMMM yyyy'),
                intro: data.abstract,
                introHtml: parseMarkdown(data.abstract),
                body: content,
                bodyHtml: parseMarkdown(content),
                tags: data.tags || [],
            };
        });

    const sortedArticles = sortBy(articles, a => a!.date).reverse();

    return sortedArticles;
};
