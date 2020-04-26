import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import readArticles from '../services/read-articles';

type IndexPageProps = {
    articleList: Array<{
        url: string;
        title: string;
        abstract: string;
        date: string;
    }>;
};

const IndexPage: NextPage<IndexPageProps> = ({ articleList }) => (
    <>
        <Head>
            <title>abcd</title>
        </Head>
        <div className="w-full max-w-screen-xl mx-auto p-6">
            <h1 className="font-bold mb-6">Hello</h1>
            <ul>
                {articleList.map((article) => (
                    <li className="mb-6" key={`article-list-${article.url}`}>
                        <p className="mb-1 text-gray-700">{article.date}</p>
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="block font-bold mb-2 text-xl">{article.title}</a>
                        </Link>
                        <p className="mb-1">{article.abstract}</p>
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
    </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const articles = await readArticles();

    return {
        props: {
            articleList: articles.map((a) => {
                return {
                    title: a.title,
                    url: `/blog/${a.slug}`,
                    abstract: a.abstract,
                    date: a.dateFormatted,
                };
            }),
        },
    };
};
