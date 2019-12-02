import fs from 'fs-extra';
// import bs from 'browser-sync';

import fetchAllArticles, { Article } from './fetchAllArticles';
import renderPage from './renderPage';

import htmlMinify from 'html-minifier';

const writeHtml = (path: string, content: string) => {
    const minifiedHtml = htmlMinify.minify(content, { collapseWhitespace: true });
    fs.writeFileSync(`dist${path}`, minifiedHtml);
};

type Page = {
    css: string;
    js: string;
};

type HomePage = Page & {
    articles: Article[];
    latestArticles: Article[];
    topArticles: Article[];
};

type ArchivePage = Page & {
    articles: Article[];
};

type AboutPage = Page & {
    //
};

type ArticlePage = Page & Article;

const renderHomePage = async (articles: Article[], css: string, js: string) => {
    const html = await renderPage<HomePage>('home.html', {
        articles,
        latestArticles: articles.slice(0, 5),
        topArticles: articles.slice(0, 3),
        css,
        js,
    });

    writeHtml('/index.html', html);
};

const renderArticlePages = async (articles: Article[], css: string, js: string) => {
    return Promise.all(
        articles.map(async article => {
            const html = await renderPage<ArticlePage>('article.html', { ...article, css, js });
            writeHtml(article.url, html);
        })
    );
};

const generate = async () => {
    console.time('Done.');

    fs.ensureDirSync('dist/blog');

    console.time('Fetching data');
    const articles = await fetchAllArticles();
    const css = fs.readFileSync('dist/main.css', 'utf-8');
    const js = fs.readFileSync('dist/main.js', 'utf-8');

    console.timeEnd('Fetching data');

    console.time('Rendering');
    await Promise.all([
        renderArticlePages(articles, css, js),
        renderHomePage(articles, css, js),
        renderPage<ArchivePage>('archive.html', { articles, css, js }).then(html =>
            writeHtml('/blog/index.html', html)
        ),
        renderPage<AboutPage>('about.html', { css, js }).then(html => writeHtml('/about.html', html)),
    ]);
    console.timeEnd('Rendering');

    console.timeEnd('Done.');
};

export default generate;
