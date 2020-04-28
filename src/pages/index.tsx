import { useEffect } from 'react';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import readArticles from '../services/read-articles';
import { PageMetaData } from '../types';
import PageMetaTags from '../components/PageMetaTags';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

type IndexPageProps = {
    meta: PageMetaData;
    articleList: Array<{
        url: string;
        title: string;
        intro: string;
        date: string;
        tags: string[];
    }>;
};

const IndexPage: NextPage<IndexPageProps> = ({ articleList, meta }) => {
    useEffect(() => {
        import('../services/prism').then((Prism) => Prism.default.highlightAll());
    });

    return (
        <>
            <PageMetaTags {...meta} />
            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="w-full max-w-screen-xl mx-auto p-6">
                        <h1 className="font-bold mb-6">Hello</h1>
                        <ul>
                            {articleList.map((article) => (
                                <li className="mb-6" key={`article-list-${article.url}`}>
                                    <p className="mb-1 text-gray-700">{article.date}</p>
                                    <Link href="/blog/[slug]" as={article.url}>
                                        <a className="block font-bold mb-2 text-xl">{article.title}</a>
                                    </Link>
                                    {/* <p className="mb-3">
                            {article.tags.length > 0 && (
                                <ul className="flex">
                                    {article.tags.map((t) => (
                                        <li className="rounded-full border-purple-300 py-1 px-3 border-2 mr-2">{t}</li>
                                    ))}
                                </ul>
                            )}
                        </p> */}
                                    <p className="mb-1" dangerouslySetInnerHTML={{ __html: article.intro }} />
                                    <Link href="/blog/[slug]" as={article.url}>
                                        <a className="text-purple-700 font-bold hover:text-purple-900">Read article</a>
                                    </Link>
                                    {/* <Link href="/blog/[slug]" as={article.url}>
                            <a className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Read article
                            </a>
                        </Link> */}
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

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const articles = await readArticles();

    return {
        props: {
            meta: {
                canonical: 'https://bdadam.com/',
                lang: 'en',

                // TODO: improve title and description
                title: 'Adam Beres-Deak',
                description: 'My devblog about web development, JavaScript, NodeJS, CSS, less',
                og: {
                    site_name: 'bdadam.com',
                    type: 'website',
                    // TODO: add og:image
                },
                twitter: {
                    site: '@bdadamm',
                    // TODO: use summary_large_image when home page has large image to show
                    card: 'summary',
                },
            },
            articleList: articles.map((a) => {
                return {
                    title: a.title,
                    url: `/blog/${a.slug}`,
                    intro: a.intro.html,
                    date: a.dateFormatted,
                    tags: a.tags,
                };
            }),
        },
    };
};
