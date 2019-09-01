import glob from 'glob-promise';
import { sortBy } from 'lodash';

import readArticle from './readArticle';

export default async () => {
    const articleFiles = await glob('content/blog/*.md');
    const articles = articleFiles.map(readArticle).filter(Boolean);
    const sortedArticles = sortBy(articles, a => a.date).reverse();

    return sortedArticles;
};
