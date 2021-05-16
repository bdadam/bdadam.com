import fs from 'fs';
import path from 'path';
import express from 'express';

import readArticles from '../src/services/read-articles';

import { createServer as createViteServer, ViteDevServer } from 'vite';

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

const app = express();

async function createServer() {
    const root = process.cwd();
    const isProd = process.env.NODE_ENV === 'production';
    const resolve = (p: string) => path.resolve(__dirname, p);

    const indexProd = isProd ? fs.readFileSync(resolve('../dist/index.html'), 'utf-8') : '';

    const vite = await createViteServer({
        root,
        logLevel: isTest ? 'error' : 'info',
        server: {
            middlewareMode: true,
            watch: {
                // During tests we edit the files too fast and sometimes chokidar
                // misses change events, so enforce polling for consistency
                usePolling: true,
                interval: 100,
            },
        },
    });

    app.use(vite.middlewares);

    if (process.env.NODE_ENV === 'production') {
        app.get('/assets/*', express.static('dist'));
    }

    app.get('/sitemap.xml', (req, res) => {
        readArticles().then((articles) => {
            const x = [
                '<?xml version="1.0" encoding="utf-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                '<url><loc>https://bdadam.com/</loc></url>',
                '<url><loc>https://bdadam.com/about.html</loc></url>',
                ...articles.map((a) => `<url><loc>https://bdadam.com${a.url}</loc></url>`),
                '</urlset>',
            ];

            res.set('Content-Type', 'text/xml').send(x.join('\n'));
        });
    });

    app.get('*', async (req, res) => {
        try {
            const url = req.originalUrl;

            let template, render;
            if (!isProd) {
                template = fs.readFileSync(resolve('../index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule('src/entry-server.tsx')).render;
            } else {
                template = indexProd;
                render = require('../dist/server/entry-server.js').render;
            }

            const { html: appHtml, title, meta } = await render(url);

            const html: string = template.replace(`<!--app-html-->`, appHtml).replace('<!--meta-->', `${title}${meta}`);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            // !isProd && vite.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return { app };
}

if (!isTest) {
    createServer().then(({ app }) =>
        app.listen(3000, () => {
            console.log('http://localhost:3000');
        })
    );
}

// for test use
exports.createServer = createServer;
