import { pick } from 'lodash';

import readAllArticles from '../../helpers/readAllArticles';

export const get = async (req, res) => {
    const articles = await readAllArticles();

    res.send({
        articles: articles.map(a => pick(a, ['title', 'description', 'abstract', 'url', 'dateFormatted', 'tags'])),
    });
};
