import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import TestComponent from './TestComponent';
import IndexPage, { fetchIndexPageProps } from './pages/IndexPage';
import readArticles from './services/read-articles';

export const render = async (url: string) => {
    // const articles = await readArticles();

    // const props: IndexPageProps = {
    //     meta: {
    //         canonical: 'https://bdadam.com/',
    //         lang: 'en',

    //         // TODO: improve title and description
    //         title: 'Adam Beres-Deak',
    //         description: 'My devblog about web development, JavaScript, NodeJS, CSS, less',
    //         og: {
    //             site_name: 'bdadam.com',
    //             type: 'website',
    //             // TODO: add og:image
    //         },
    //         twitter: {
    //             site: '@bdadamm',
    //             // TODO: use summary_large_image when home page has large image to show
    //             card: 'summary',
    //         },
    //     },
    //     articleList: articles.map((a) => {
    //         return {
    //             title: a.title,
    //             url: `/blog/${a.slug}`,
    //             intro: a.intro.html,
    //             date: a.dateFormatted,
    //             tags: a.tags,
    //         };
    //     }),
    // };

    if (url === '/') {
        const props = await fetchIndexPageProps();

        const html = renderToString(<IndexPage {...props} />);
        const h = Helmet.renderStatic();
        const title = h.title.toString();
        const meta = h.meta.toString();

        return { html, title, meta };
    }
};
