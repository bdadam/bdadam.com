import fs from 'fs';

import { h } from 'preact';
import express from 'express';
import render from 'preact-render-to-string';

import Page from '../components/Page';
import { PageMetaData } from 'src/types';

const app = express();

// import '../styles/tailwind.css';
// import '../styles/defaults.css';
// import '../styles/prism.css';
// import '../styles/article.module.css';
// @ts-ignore
import styles from '../styles/main.css';

// console.log(styles);

import { IndexPage, getIndexPageProps } from './IndexPage';
import { BlogArticlePage, getBlogArticleProps } from './BlogArticlePage';

// if (app.get('env') === 'development') {
//     const livereload = require('easy-livereload');

//     app.use(
//         livereload({
//             watchDirs: [
//                 //   path.join(__dirname, 'public'),
//                 'dist',
//             ],
//         })
//     );
// }

app.get('/', async (req, res) => {
    const props = await getIndexPageProps();

    const html = render(<IndexPage {...props} styles={styles} />);

    res.send(html);
});

app.get('/blog/:slug', async (req, res) => {
    const props = await getBlogArticleProps(req.params.slug);
    const html = render(<BlogArticlePage {...props} styles={styles} />);
    res.send(html);
});

app.get('*', (req, res) => {
    const css = fs.readFileSync('dist/server/index.css', 'utf-8');

    const meta: PageMetaData = {
        title: 'title',
        description: 'desc',
        canonical: 'https://bdadam.com/',
    };

    const html = render(
        <Page meta={meta}>
            <style>{css}</style>
            <div>Hello</div>
        </Page>
    );

    res.send(html);
});

export default app;
