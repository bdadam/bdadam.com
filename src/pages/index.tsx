import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import readArticles from '../services/read-articles';

type IndexPageProps = {
    articleList: Array<{
        url: string;
        title: string;
        abstract: string;
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
                    <li className="mb-6">
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="block font-bold mb-2 text-xl">{article.title}</a>
                        </Link>
                        <p className="mb-3">{article.abstract}</p>
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                Read article
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>

            <Link href="/about.html">
                <a>About</a>
            </Link>
            <br />
            <Link href="/blog/[slug]" as="/blog/displaying-icons-with-custom-elements.html">
                <a>/blog/displaying-icons-with-custom-elements.html</a>
            </Link>
        </div>
    </>
);

export default IndexPage;

export const getStaticPaths: GetStaticPaths = async () => {
    return { fallback: false, paths: ['/'] };
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
    const articles = await readArticles();

    return {
        props: {
            articleList: articles.map((a) => {
                return { title: a.title, url: `/blog/${a.slug}`, abstract: a.abstract };
            }),
        },
    };
};
