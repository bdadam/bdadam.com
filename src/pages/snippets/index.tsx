import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import { MarkdownResult } from 'src/types';
import readSnippets from '../../services/read-snippets';

import articleStyles from '../../styles/article.module.css';

import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

type SippetsIndexPageProps = {
    snippets: Array<{
        url: string;
        title: string;
        body: MarkdownResult;
        date: string;
        tags: string[];
    }>;
};

const SnippetsIndexPage: NextPage<SippetsIndexPageProps> = ({ snippets }) => {
    useEffect(() => {
        import('../../services/prism').then((Prism) => Prism.default.highlightAll());
    });

    return (
        <>
            <Head>
                <title>abcd</title>
            </Head>
            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="w-full max-w-screen-xl mx-auto p-6">
                        <h1 className="font-bold mb-6">Code snippets</h1>
                        <ul>
                            {snippets.map((snippet) => (
                                <li className="mb-6" key={`article-list-${snippet.url}`}>
                                    <Link href="/snippets/[slug]" as={snippet.url}>
                                        <a className="block font-bold mb-2 text-xl">{snippet.title}</a>
                                    </Link>
                                    {/* <p className="mb-1 text-gray-700">{snippet.date}</p> */}
                                    <div
                                        className={articleStyles['article-body']}
                                        dangerouslySetInnerHTML={{ __html: snippet.body.html }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <SiteFooter />
            </div>
        </>
    );
};

export default SnippetsIndexPage;

export const getStaticProps: GetStaticProps<SippetsIndexPageProps> = async () => {
    const snippets = await readSnippets();

    return {
        props: {
            snippets: snippets.map((a) => {
                return {
                    title: a.title,
                    url: `/snippets/${a.slug}`,
                    body: a.body,
                    date: a.dateFormatted,
                    tags: a.tags,
                };
            }),
        },
    };
};
