import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import readArticles from '../../services/read-articles';

type IndexPageProps = {
    articleList: Array<{
        url: string;
        title: string;
        abstract: string;
        date: string;
        tags: string[];
    }>;
};

const BlogArchivePage: NextPage<IndexPageProps> = ({ articleList }) => (
    <>
        <Head>
            <title>abcd</title>
        </Head>
        <div className="w-full max-w-screen-xl mx-auto p-6">
            <h1 className="font-bold mb-6">Article archive</h1>
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
                        <p className="mb-1">{article.abstract}</p>
                        <Link href="/blog/[slug]" as={article.url}>
                            <a className="text-purple-700 font-bold hover:text-purple-900">Read article</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </>
);

export default BlogArchivePage;

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
                    tags: a.tags,
                };
            }),
        },
    };
};
