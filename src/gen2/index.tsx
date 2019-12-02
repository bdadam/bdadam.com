import React from 'react';
import ReactDOMServer from 'react-dom/server';

import HomePage from './HomePage';

const run = async () => {
    console.time('Done.');

    console.log(ReactDOMServer.renderToStaticMarkup(<HomePage topArticles={['a', 'b']} />));

    console.timeEnd('Done.');
};

run();
