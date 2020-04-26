import { useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';

import { Article } from '../../types';

import articleStyles from '../../styles/article.module.css';
import readArticles from '../../services/read-articles';

type ArticlePageProps = {
    article: {
        title: string;
        intro: string;
        body: string;
    };
};

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {
    useEffect(() => {
        import('../../services/prism').then((Prism) => Prism.default.highlightAll());
    });

    return (
        <>
            <div className="w-full max-w-screen-xl mx-auto p-6">
                <h1 className="font-bold text-2xl mb-4">{article.title}</h1>
                <div className="mb-2">{article.intro}</div>
                <div className={articleStyles['article-body']} dangerouslySetInnerHTML={{ __html: article.body }}></div>
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

    return { props: { article: { title: article.title, intro: article.abstract, body: article.body.html } } };
};

export default ArticlePage;
