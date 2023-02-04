import React from 'react';

import IndexPage, { IndexPageProps } from './IndexPage';
import BlogArticlePage, { BlogArticlePageProps } from './BlogArticlePage';
import AboutPage, { AboutPageProps } from './AboutPage';

const App = (props: BlogArticlePageProps | IndexPageProps | AboutPageProps): React.ReactElement => {
    if (props.pageid === 'home') {
        return <IndexPage {...props} />;
    }

    if (props.pageid === 'blogarticle') {
        return <BlogArticlePage {...props} />;
    }

    if (props.pageid === 'about') {
        return <AboutPage {...props} />;
    }

    return <div>Not found</div>;
};

export default App;
