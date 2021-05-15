import React from 'react';
import Helmet from 'react-helmet';
import { renderToString } from 'react-dom/server';

import TestComponent from './TestComponent';

export const render = () => {
    const html = renderToString(
        <div>
            <Helmet>
                <meta name="description" content="DESC" />
            </Helmet>
            Hello
            <TestComponent title="qwe" />
        </div>
    );
    const h = Helmet.renderStatic();
    const title = h.title.toString();
    const meta = h.meta.toString();

    return { html, title, meta };
};
