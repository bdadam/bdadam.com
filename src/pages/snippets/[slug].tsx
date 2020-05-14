import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { Snippet, PageMetaData } from '../../types';

import readSnippets from 'src/services/read-snippets';
import { useEffect } from 'react';
import PageMetaTags from 'src/components/PageMetaTags';
import Head from 'next/head';
import SiteHeader from 'src/components/SiteHeader';
import SiteFooter from 'src/components/SiteFooter';
import Link from 'next/link';

type SnippetPageProps = {
    meta: PageMetaData;
    snippet: {
        url: string;
        title: string;
        date: string;
        dateFormatted: string;
        body: string;
    };
};

const SnippetsPage: NextPage<SnippetPageProps> = ({ meta, snippet }) => {
    useEffect(() => {
        import('../../services/prism').then((Prism) => Prism.default.highlightAll());
    });

    return (
        <>
            <PageMetaTags {...meta} />
            <Head>
                <meta name="author" content="Adam Beres-Deak" />
            </Head>

            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="w-full max-w-screen-xl mx-auto px-6 pb-6 mb-4">
                        <div className="py-6">
                            <h1 className="font-bold text-2xl mb-2">{snippet.title}</h1>
                            <p className="text-gray-700">
                                {snippet.dateFormatted} &middot; published by{' '}
                                <Link href="/about.html">
                                    <a className="text-blue-700">Adam Beres-Deak</a>
                                </Link>
                            </p>
                        </div>
                        <div className="mb-4" dangerouslySetInnerHTML={{ __html: snippet.body }} />
                    </div>
                </div>
                <SiteFooter />
            </div>
        </>
    );
};

export default SnippetsPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const snippets = await readSnippets();
    return { fallback: false, paths: snippets.map((a) => ({ params: { slug: a.slug } })) };
};

export const getStaticProps: GetStaticProps<SnippetPageProps> = async (ctx) => {
    const snippets = await readSnippets();
    const slug = ctx!.params!.slug!;
    // const slug = ctx!.params!.slug![0];

    // articles.forEach((a) => (a.slug = `${a.slug}x`));

    const snippet = snippets.find((a) => a.slug === slug);

    if (!snippet) {
        throw new Error('Article not found');
    }

    return {
        props: {
            meta: {
                title: snippet.title,
                canonical: `https://bdadam.com${snippet.url}`,
                description: 'Code snippet', // TODO
                lang: 'en',
            },
            snippet: {
                url: snippet.url,
                title: snippet.title,
                body: snippet.body.html,
                date: snippet.date.toISOString(),
                dateFormatted: snippet.dateFormatted,
            },
        },
    };
};
