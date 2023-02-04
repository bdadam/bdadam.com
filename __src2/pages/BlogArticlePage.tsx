/*
Things on this page:
- [x] Title
- [x] Author
- [x] Article body
- [ ] Tags
- [ ] Tags with links
- [x] Publish date
- [ ] Last revision/update/re-publish date
- [x] About author
- [x] Author ld+json
- [ ] Breadcrumbs
- [ ] Breadcrumbs ld+json
- [ ] Share buttons
- [ ] Native share button
- [x] Most popular articles
- [x] Latest articles
- [ ] Article ld+json
- [ ] Title
- [ ] Title
- [ ] Title
- [ ] Title

*/

import React, { FC } from 'react';

import { PageMetaData } from '../types';

import readArticles from '../services/read-articles';
import PageMetaTags from '../components/PageMetaTags';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import TopArticles from '../components/TopArticles';
import AboutAuthor from '../components/AboutAuthor';
// import Breadcrumbs from '../components/Breadcrumbs';
import { Helmet } from 'react-helmet';

export type BlogArticlePageProps = {
    pageid: 'blogarticle';
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
    topArticles: Array<{
        url: string;
        title: string;
        intro: string;
    }>;
};

const BlogArticlePage: FC<BlogArticlePageProps> = ({ article, latestArticles, meta, topArticles }) => {
    return (
        <>
            {/* <PageMetaTags {...meta} /> */}
            <Helmet>
                <meta name="author" content="Adam Beres-Deak" />
            </Helmet>
            <SiteHeader />
            <div className="page-width">
                <div>
                    {/* <div className="mt-4">
                            <Breadcrumbs />
                        </div> */}
                    <div className="lg:flex">
                        <div className="lg:w-2/3 lg:mr-6">
                            <div className="py-6">
                                <h1 className="article-title">{article.title}</h1>
                                <p className="article-info">
                                    {article.dateFormatted} &middot; published by{' '}
                                    <a href="/about.html" className="text-blue-700">
                                        Adam Beres-Deak
                                    </a>
                                </p>
                            </div>
                            <div className="article-intro" dangerouslySetInnerHTML={{ __html: article.intro }} />
                            <div className="article-body" dangerouslySetInnerHTML={{ __html: article.body }}></div>
                        </div>
                        <div className="lg:w-1/3 lg:max-w-xs">
                            <div className=" px-5 pt-6 x-bg-blue-100 rounded mb-2">
                                <AboutAuthor />
                            </div>
                            {/* TODO: fix improve colors to make text more readable */}
                            <div className=" p-5 x-bg-yellow-100 rounded text-gray-800">
                                <h4 className="font-bold mb-4 text-teal-600">Popular articles</h4>
                                <TopArticles articles={topArticles} />
                            </div>
                        </div>
                    </div>

                    <hr className="my-6" />
                    <h2 className="font-bold mb-3 text-2xl mt-10">Latest articles</h2>
                    <ul>
                        {latestArticles.map((a) => (
                            <li className="mb-4" key={`latest-articles-${a.url}`}>
                                <a href={a.url} className="block mb-1">
                                    {/* <p className="font-bold">{a.title}</p> */}
                                    <p className="">{a.title}</p>
                                </a>
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
        </>
    );
};

export const fetchBlogArticlePageProps = async (url: string): Promise<BlogArticlePageProps> => {
    const articles = await readArticles();
    const article = articles.find((a) => a.url === url);

    if (!article) {
        throw new Error('Article not found');
    }

    const latestArticles = articles.slice(0, 5);

    return {
        pageid: 'blogarticle',
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
        topArticles: [
            articles.find((a) => a.slug === 'automatically-adapting-the-height-textarea.html'),
            articles.find((a) => a.slug === 'finding-a-random-document-in-mongodb.html'),
            articles.find((a) => a.slug === 'panning-and-scrolling-background-images-using-the-canvas-element.html'),
        ]
            .filter((a) => a)
            .filter((a) => a!.url !== url)
            .map((a) => {
                return {
                    title: a!.title,
                    url: a!.url,
                    intro: a!.intro.html,
                };
            }),
    };
};

export default BlogArticlePage;
