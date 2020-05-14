import fs from 'fs-extra';
import matter from 'gray-matter';
import speakingurl from 'speakingurl';

import { format } from 'date-fns';

import { Snippet } from '../types';

import parseMarkdown from './parse-markdown';

type SnippetFrontMatter = {
    title: string;
    description: string;
    abstract: string;
    published?: boolean;
    date: Date;
    tags: string[];
};

type SnippetMd = {
    slug: string;
    data: SnippetFrontMatter;
    content: string;
};

function isPublishedMdSnippet(snippet: {
    slug: string;
    data: Partial<SnippetFrontMatter>;
    content: string;
}): snippet is SnippetMd {
    return (
        !!snippet &&
        !!snippet.slug &&
        !!snippet.data.title &&
        !!snippet.data.date &&
        snippet.data.date.getTime() > 0 &&
        snippet.data.published !== false
    );
}

export default async function (): Promise<Snippet[]> {
    const snippetsDir = 'content/snippets';
    const snippetFilenames = fs.readdirSync(snippetsDir);

    const snippetFileContents = snippetFilenames.map((filename) => {
        return { name: filename, content: fs.readFileSync(`${snippetsDir}/${filename}`, 'utf-8') };
    });

    const rawSnippets: SnippetMd[] = snippetFileContents
        .map((file) => {
            const mt = matter(file.content);
            const data: Partial<SnippetFrontMatter> = mt.data;
            data.date = new Date(data.date ?? '0000-00-00');

            const slug = `${speakingurl(data.title ?? '', { lang: 'en' })}.html`;

            return { slug, data, content: mt.content };
        })
        .filter((a) => isPublishedMdSnippet(a)) as SnippetMd[];

    rawSnippets.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

    const snippets: Snippet[] = rawSnippets.map((a) => {
        const date = new Date(a.data.date);

        return {
            title: a.data.title,
            slug: a.slug,
            date,
            dateFormatted: format(date, 'do MMMM yyyy'),
            url: `/snippets/${a.slug}`,
            meta: {
                description: a.data.description ?? '',
            },
            intro: parseMarkdown(a.data.abstract ?? ''),
            body: parseMarkdown(a.content),
            tags: a.data.tags || [],
        };
    });

    // articles.sort((a, b) => a.date - b.date)

    return snippets;
}
