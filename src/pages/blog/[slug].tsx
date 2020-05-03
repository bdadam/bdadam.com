import { useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

import { PageMetaData } from '../../types';

import articleStyles from '../../styles/article.module.css';
import readArticles from '../../services/read-articles';
import PageMetaTags from 'src/components/PageMetaTags';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { GitHub, Twitter, Linkedin, Xing, Email } from '../../components/Icons';

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
            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="w-full max-w-screen-xl mx-auto px-6 pb-6 mb-4">
                        <div className="py-10">
                            <h1 className="font-bold text-2xl mb-2">{article.title}</h1>
                            <p className="text-gray-700">
                                {article.dateFormatted} &middot; published by{' '}
                                <Link href="/about.html">
                                    <a className="text-blue-700">Adam Beres-Deak</a>
                                </Link>
                            </p>
                        </div>

                        <div className="lg:flex">
                            <div className="lg:w-2/3 lg:mr-6">
                                <div className="mb-2" dangerouslySetInnerHTML={{ __html: article.intro }} />
                                <div
                                    className={articleStyles['article-body']}
                                    dangerouslySetInnerHTML={{ __html: article.body }}
                                ></div>
                            </div>
                            <div className="flex-grow">
                                <div className=" p-3 bg-blue-100 rounded">
                                    {/* <p className="text-gray-600 mb-2">About the author</p> */}
                                    <Link href="/about.html">
                                        <a className="block flex items-center mb-2">
                                            <div
                                                style={{ backgroundImage: 'url(/face.jpg)' }}
                                                className="rounded bg-contain w-12 h-12 mr-3"
                                            ></div>
                                            <div>
                                                <p className="font-bold text-xl">Adam Beres-Deak</p>
                                                <p className="text-sm text-gray-700 small-caps">
                                                    {/* lead software engineer */}
                                                    software engineer
                                                    {/* web enthusiast */}
                                                </p>
                                            </div>
                                            {/* <span style={{ fontVariant: 'small-caps' }}>bdadam.com</span> */}
                                        </a>
                                    </Link>
                                    {/* <p>Adam is blah blubb</p> */}
                                    <div className="">
                                        <a
                                            href="https://github.com/bdadam"
                                            className="hover:underline mr-2 inline-block"
                                            rel="external"
                                            title="GitHub"
                                        >
                                            <GitHub width={32} height={32} />
                                        </a>
                                        <a
                                            href="https://twitter.com/bdadamm"
                                            className="hover:underline mr-2 inline-block"
                                            rel="external"
                                            title="Twitter"
                                        >
                                            <Twitter width={32} height={32} />
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/bdadam/"
                                            className="hover:underline mr-2 inline-block"
                                            rel="external"
                                            title="LinkedIn"
                                        >
                                            <Linkedin width={32} height={32} />
                                        </a>
                                        <a
                                            href="https://www.xing.com/profile/Adam_BeresDeak"
                                            className="hover:underline mr-2 inline-block"
                                            rel="external"
                                            title="Xing"
                                        >
                                            <Xing width={32} height={32} />
                                        </a>
                                        <a
                                            href="mailto:me@bdadam.com"
                                            className="hover:underline mr-2 inline-block"
                                            title="E-Mail"
                                        >
                                            <Email width={32} height={32} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="my-6" />
                        <h2 className="font-bold mb-3 text-2xl mt-10">Latest articles</h2>
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
                </div>
                <SiteFooter />
            </div>
        </>
    );
};

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async () => {
    const articles = await readArticles();

    // return { fallback: false, paths: [{ params: { slug: 'displaying-icons-with-custom-elements.html' } }] };
    // return { fallback: false, paths: articles.map((a) => ({ params: { slug: [a.slug] } })) };
    return { fallback: false, paths: articles.map((a) => ({ params: { slug: a.slug } })) };
    // return { fallback: false, paths: articles.map((a) => ({ params: { slug: `${a.slug}x` } })) };
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (ctx) => {
    const articles = await readArticles();
    const slug = ctx!.params!.slug!;
    // const slug = ctx!.params!.slug![0];

    // articles.forEach((a) => (a.slug = `${a.slug}x`));

    const article = articles.find((a) => a.slug === slug);

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
