import { Fragment, FunctionComponent, h } from 'preact';

import { PageMetaData } from '../types';

const MetaTags: FunctionComponent<PageMetaData> = (meta) => {
    return (
        <Fragment>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
            <link rel="canonical" href={meta.canonical} />
            {meta.og?.type && <meta property="og:type" content={meta.og.type} />}
            {meta.og?.title && <meta property="og:title" content={meta.og.title} />}
            {meta.og?.description && <meta property="og:description" content={meta.og.description} />}
            {meta.og?.audio && <meta property="og:audio" content={meta.og.audio} />}
            {meta.og?.image && (
                <Fragment>
                    <meta property="og:image" content={meta.og.image.url} />
                    <meta property="og:width" content={'' + meta.og.image.width} />
                    <meta property="og:height" content={'' + meta.og.image.height} />
                </Fragment>
            )}
            {meta.og?.type === 'article' && meta.og?.article && (
                <Fragment>
                    {meta.og.article.authors?.map((author) => (
                        <meta property="article:author" content={author} key={`article-author-${author}`} />
                    ))}

                    {meta.og.article.tags?.map((tag) => (
                        <meta property="article:tag" content={tag} key={`meta-article-tag-${tag}`} />
                    ))}

                    {meta.og.article.section && <meta property="article:section" content={meta.og.article.section} />}
                </Fragment>
            )}
            {meta.twitter?.site && <meta name="twitter:site" content={meta.twitter.site} />}
            {meta.twitter?.card && <meta name="twitter:card" content={meta.twitter.card} />}
            {meta.twitter?.title && <meta name="twitter:title" content={meta.twitter.title} />}
            {meta.twitter?.description && <meta name="twitter:description" content={meta.twitter.description} />}
            {meta.twitter?.image && <meta name="twitter:image" content={meta.twitter.image.url} />}
            {meta.twitter?.image?.alt && <meta name="twitter:image:alt" content={meta.twitter.image.alt} />}
            {meta.author && <meta name="author" content={meta.author} />}
        </Fragment>
    );
};

export default MetaTags;
