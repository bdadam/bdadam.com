import React from 'react';
import { renderToString } from 'react-dom/server';

export const render = () => {
    const html = renderToString(<div>Hello</div>);
    return html;
};
