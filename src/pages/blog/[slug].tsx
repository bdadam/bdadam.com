import { useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

import { PageMetaData } from '../../types';

import articleStyles from '../../styles/article.module.css';
import readArticles from '../../services/read-articles';
import PageMetaTags from 'src/components/PageMetaTags';

type ArticlePageProps = {
    meta: PageMetaData;
    article: {
        url: string;
        title: string;
        date: string;
        dateFormatted: string;
        intro: string;
        body: string;
    };
    latestArticles: Array<{
        url: string;
        title: string;
        intro: string;
    }>;
};

const ArticlePage: NextPage<ArticlePageProps> = ({ article, latestArticles, meta }) => {
    useEffect(() => {
        import('../../services/prism').then((Prism) => Prism.default.highlightAll());
    });

    return (
        <>
            <PageMetaTags {...meta} />
            <div className="w-full max-w-screen-xl mx-auto p-6">
                <h1 className="font-bold text-2xl mb-4">{article.title}</h1>
                <p className="mb-2 text-gray-700">{article.dateFormatted}</p>
                <div className="max-w-5xl">
                    <div className="mb-2" dangerouslySetInnerHTML={{ __html: article.intro }} />
                    <div
                        className={articleStyles['article-body']}
                        dangerouslySetInnerHTML={{ __html: article.body }}
                    ></div>
                </div>

                <hr className="my-6" />
                <h2 className="font-bold mb-3 text-2xl mt-20">Latest articles</h2>
                <ul>
                    {latestArticles.map((a) => (
                        <li className="mb-4" key={`latest-articles-${a.url}`}>
                            <Link href="/blog/[slug]" as={a.url}>
                                <a className="block mb-1">
                                    {/* <p className="font-bold">{a.title}</p> */}
                                    <p className="">{a.title}</p>
                                </a>
                            </Link>
                            {/* <p className="mb-2">{a.intro}</p>
                            <Link href="/blog/[slug]" as={a.url}>
                                <a className="block mb-1 text-purple-700 font-bold hover:text-purple-900">Read more</a>
                            </Link> */}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await readArticles();

    // return { fallback: false, paths: [{ params: { slug: 'displaying-icons-with-custom-elements.html' } }] };
    return { fallback: false, paths: articles.map((a) => ({ params: { slug: a.slug } })) };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (ctx) => {
    const articles = await readArticles();
    const article = articles.find((a) => a.slug === ctx!.params!.slug!);

    if (!article) {
        throw new Error('Article not found');
    }

    const latestArticles = articles.slice(0, 5);

    return {
        props: {
            meta: {
                canonical: `https://bdadam.com${article.url}`,
                lang: 'en',
                title: article.title,
                description: article.intro.raw,
                og: {
                    type: 'article',
                    title: article.title,
                    article: {
                        authors: ['https://bdadam.com/'],
                        tags: article.tags,
                    },
                    // TODO: add og:image
                },
                twitter: {
                    site: '@bdadamm',
                    // TODO: use summary_large_image when articles have images
                    card: 'summary',
                },
            },
            article: {
                url: article.url,
                title: article.title,
                date: article.date.toISOString(),
                dateFormatted: article.dateFormatted,
                intro: article.intro.html,
                body: article.body.html,
            },
            latestArticles: latestArticles.map((a) => {
                return {
                    title: a.title,
                    url: a.url,
                    intro: a.intro.html,
                };
            }),
        },
    };
};

export default ArticlePage;
