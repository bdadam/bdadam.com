import fs from 'fs-extra';

import htmlnano from 'htmlnano';

import App from './App.svelte';

const x = App.render({ abc: 'SERVER', url: '/' });

const manifest = fs.readJSONSync('dist/assets/manifest.json');

var html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <link rel="stylesheet" href="${manifest['main.css']}" />
            ${x.head}
        </head>
        <body>
            <div id="app">
                ${x.html}
            </div>
            <script src="${manifest['main.js']}"></script>
        </body>
    </html>
`;

const run = async () => {
    const htm = await htmlnano.process(html, {
        removeEmptyAttributes: false,
        collapseWhitespace: 'conservative',
    });

    fs.writeFileSync('dist/index.html', htm.html);

    console.log('Done.');
};

run();
