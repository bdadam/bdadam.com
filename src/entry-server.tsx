import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

import { fetchIndexPageProps, IndexPageProps } from './pages/IndexPage';
import { BlogArticlePageProps, fetchBlogArticlePageProps } from './pages/BlogArticlePage';
import { AboutPageProps } from './pages/AboutPage';
import App from './pages/App';

async function getProps(url: string): Promise<IndexPageProps | BlogArticlePageProps | AboutPageProps | null> {
    if (url === '/') {
        return fetchIndexPageProps();
    }

    if (url.startsWith('/blog/')) {
        return fetchBlogArticlePageProps(url);
    }

    if (url === '/about.html') {
        return { pageid: 'about' };
    }

    return null;
}

export const render = async (url: string) => {
    const props = await getProps(url);
    console.log(props);

    if (!props) {
        return <div>Not found</div>;
    }

    const html = renderToString(<App {...props} />);
    const h = Helmet.renderStatic();
    const title = h.title.toString();
    const meta = h.meta.toString();

    return { html, title, meta };
};
