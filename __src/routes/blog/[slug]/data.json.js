import readArticle from '../../../helpers/readArticle';

export async function get(req, res) {
    const article = readArticle(`content/blog/${req.params.slug.replace('.html', '')}.md`);
    res.send(article);
}
