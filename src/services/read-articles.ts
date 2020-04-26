import fs from 'fs-extra';
import matter from 'gray-matter';

import { format } from 'date-fns';

import { Article } from '../types';

import parseMarkdown from './parse-markdown';

type ArticleFrontMatter = {
    title: string;
    description: string;
    abstract: string;
    published?: boolean;
    date: Date;
    tags: string[];
};

type ArticleMd = {
    slug: string;
    data: ArticleFrontMatter;
    content: string;
};

function isPublishedMdArticle(article: {
    slug: string;
    data: Partial<ArticleFrontMatter>;
    content: string;
}): article is ArticleMd {
    return (
        !!article &&
        !!article.data.title &&
        !!article.data.date &&
        article.data.date.getTime() > 0 &&
        article.data.published !== false
    );
}

export default async function (): Promise<Article[]> {
    const articleFilenames = fs.readdirSync('content/blog');

    const articleFileContents = articleFilenames.map((filename) => {
        return { name: filename, content: fs.readFileSync(`content/blog/${filename}`, 'utf-8') };
    });

    const rawArticles: ArticleMd[] = articleFileContents
        .map((file) => {
            const mt = matter(file.content);
            const data: Partial<ArticleFrontMatter> = mt.data;
            data.date = new Date(data.date ?? '0000-00-00');

            const slug = file.name.replace('.md', '.html');

            return { slug, data, content: mt.content };
        })
        .filter((a) => isPublishedMdArticle(a)) as ArticleMd[];

    rawArticles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    const articles: Article[] = rawArticles.map((a) => {
        const date = new Date(a.data.date);

        return {
            title: a.data.title,
            slug: a.slug,
            date,
            dateFormatted: format(date, 'do MMMM yyyy'),
            url: `/blog/${a.slug}`,
            meta: {
                description: a.data.description ?? '',
            },
            abstract: a.data.abstract ?? a.data.description ?? '',
            body: parseMarkdown(a.content),
            tags: a.data.tags || [],
        };
    });

    // articles.sort((a, b) => a.date - b.date)

    return articles;

    // const publishedRawArticles =

    // const articles: Article[] = articleFileContents.map((file) => {
    // const publishedMdArticles: ArticleMd[] = articleFileContents
    //     .map((file) => {
    //         const mt = matter(file.content);
    //         const data: Partial<ArticleFrontMatter> = mt.data;
    //         const slug = file.name.replace('.md', '.html');

    //         if (isPublishedMdArticle()) const ret: ArticleMd = { slug, data, content: mt.content };

    //         return { slug, data, content: mt.content };

    //         // return { slug, title: mdData.title! };
    //     })
    //     .filter((a) => isPublishedMdArticle(a));

    // return articles;
}
