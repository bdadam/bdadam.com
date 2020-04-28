import { useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';

import { PageMetaData } from '../../types';

import articleStyles from '../../styles/article.module.css';
import readArticles from '../../services/read-articles';
import PageMetaTags from 'src/components/PageMetaTags';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

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

    // const iframesrcdoc = `
    //     <style>
    //     html, body, div, p { padding: 0; margin: 0; }
    //     body {
    //         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    //             'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    //         color: #111;
    //         background-color: #f1f1f1;
    //     }
    //     .bold { font-weight: bold; }
    //     .tab-switcher {
    //         background: none;
    //         border: 0;
    //         padding: 3px 12px;
    //         border-bottom: 3px solid #ccc;
    //     }
    //     .tab-switcher.active {
    //         color: purple;
    //         border-bottom: 3px solid purple;
    //     }
    //     </style>
    //     <script type="module" src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js" id="alpine"></script>
    //     <div x-data="{ tab: 'result' }">
    //         <button :class="{ 'active': tab === 'source', 'tab-switcher': true }" @click="tab = 'source'">Source code</button>
    //         <button :class="{ 'active': tab === 'result', 'tab-switcher': true }" @click="tab = 'result'">Result</button>

    //         <div x-show="tab === 'source'">
    //             <p>Sources</p>
    //         </div>
    //         <div x-show="tab === 'result'">
    //             <div>Result</div>
    //             <div>
    //                 <div>ABCDEF</div>
    //                 <script>
    //                 console.log(document.body.clientHeight);
    //                 var f = window.parent.document.getElementById('abcframe');
    //                 var f = window.parent.document.querySelector('#abcdframe')
    //                 console.log(f);
    //                 </script>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    //     <script src="/source-viewer.js" id="source-viewer"></script>
    // `;

    return (
        <>
            <PageMetaTags {...meta} />
            <div className="app flex flex-col min-h-screen">
                <SiteHeader />
                <div className="flex-grow">
                    <div className="w-full max-w-screen-xl mx-auto p-6">
                        <h1 className="font-bold text-2xl mb-4">{article.title}</h1>

                        {/* <iframe id="abcdframe" srcDoc={iframesrcdoc}></iframe>

                         */}
                        {/* <iframe src="/iframe"></iframe> */}

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
};

export const getStaticProps: GetStaticProps<ArticlePageProps> = async (ctx) => {
    const articles = await readArticles();
    const slug = ctx!.params!.slug!;
    // const slug = ctx!.params!.slug![0];

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
