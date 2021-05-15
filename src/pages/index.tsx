import { h, Fragment } from 'preact';
import { useEffect } from 'react';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import readArticles from '../services/read-articles';
import { PageMetaData } from '../types';
import PageMetaTags from '../components/PageMetaTags';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { Feedly, Rss, GitHub, Twitter, Linkedin, Email, Xing } from '../components/Icons';

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
        <Fragment>
            <PageMetaTags {...meta} />
            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="lg:flex lg:max-w-screen-xl mx-auto p-6">
                        {/* <div className="lg:w-1/3 lg:max-w-xs p-6 lg:mr-10 bg-blue-600 flex items-center"> */}
                        <div className="lg:w-1/4 x-lg:max-w-xs lg:mr-10">
                            <div
                                style={{ backgroundImage: 'url(/face.jpg)' }}
                                className="rounded-full bg-contain w-20 h-20 bg-no-repeat bg-center mx-auto mb-3"
                            ></div>
                            <div className="mb-3">
                                Hi, I'm Adam. This is my devblog where I write for my future self to make it easier to
                                find things I learned in the past. But I also try to add more context around the topics
                                so that also others can benefit from my articles.
                            </div>

                            <div className="mb-3">
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
                                    href="mailto:me@bdadam.com"
                                    className="hover:underline mr-2 inline-block"
                                    title="E-Mail"
                                >
                                    <Email width={32} height={32} />
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
                            </div>
                            <div className="flex">
                                <a href="/rss.xml">
                                    <Rss width={32} height={32} />
                                    RSS
                                </a>
                                <a
                                    href="https://feedly.com/i/subscription/feed%2Fhttps%3A%2F%2Fbdadam.com%2Frss.xml"
                                    target="blank"
                                >
                                    <Feedly width={32} height={32} />
                                    Feedly
                                </a>
                            </div>
                        </div>

                        <div className="lg:w-3/4">
                            <h1 className="font-bold mb-6 text-2xl">Recent articles</h1>
                            <ul>
                                {articleList.map((article) => (
                                    <li className="mb-6" key={`article-list-${article.url}`}>
                                        <p className="mb-1 text-gray-700 text-sm">{article.date}</p>
                                        <Link href="/blog/[slug]" as={article.url}>
                                            <a className="block font-bold mb-2 text-xl">{article.title}</a>
                                        </Link>
                                        {/* <p className="mb-3">
                                        {article.tags.length > 0 && (
                                            <ul className="flex">
                                                {article.tags.map((t) => (
                                                    <li className="rounded-full border-purple-300 py-1 px-3 border-2 mr-2">
                                                        {t}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </p> */}
                                        <div className="mb-1" dangerouslySetInnerHTML={{ __html: article.intro }} />
                                        <Link href="/blog/[slug]" as={article.url}>
                                            <a className="text-purple-700 font-bold hover:text-purple-900">
                                                Read article
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <SiteFooter />
            </div>
        </Fragment>
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
