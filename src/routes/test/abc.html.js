import readArticle from '../../helpers/readArticle';

import BlogArticle from '../blog/[slug]/index.svelte';

export async function get(req, res) {
    const article = readArticle(`content/blog/1-test-article.md`);
    // res.send(article);

    // console.log(BlogArticle);

    res.send(BlogArticle.render(article).html);
}
