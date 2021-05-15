import fs from 'fs';
import path from 'path';
import express from 'express';

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
    // } else {
    //     // app.use(require('compression')());
    //     app.use(
    //         require('serve-static')(resolve('dist/client'), {
    //             index: false,
    //         })
    //     );
    // }

    if (process.env.NODE_ENV === 'production') {
        app.get('/assets/*', express.static('dist'));
    }

    app.use('*', async (req, res) => {
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

            const context = {};
            const { html: appHtml, title, meta } = render(url, context);

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
