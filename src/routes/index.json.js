import { pick } from 'lodash';

import readAllArticles from '../helpers/readAllArticles';

export async function get(req, res, next) {
    const articles = await readAllArticles();

    const data = {
        latestArticles: articles.map(a => pick(a, ['title', 'abstract', 'dateFormatted', 'url', 'tags'])),
    };

    res.send(data);
}
