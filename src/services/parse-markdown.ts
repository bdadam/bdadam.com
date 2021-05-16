import fs from 'fs';

import { MarkdownResult } from '../types';

import markdownit from 'markdown-it';
import container from 'markdown-it-container';
// @ts-ignore
import deflist from 'markdown-it-deflist';
// @ts-ignore
import footnote from 'markdown-it-footnote';
// @ts-ignore
import tasklists from 'markdown-it-task-lists';
// @ts-ignore
import anchor from 'markdown-it-anchor';
// @ts-ignore
import toc from 'markdown-it-toc-done-right';
// @ts-ignore
import attrs from 'markdown-it-attrs';
// @ts-ignore
import linkAttributes from 'markdown-it-link-attributes';
// @ts-ignore
import plantuml from 'markdown-it-plantuml';
// @ts-ignore
import mermaid from 'markdown-it-mermaid';
// import diagrams from 'markdown-it-diagrams';

import prism from 'markdown-it-prism';

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
})
    .use(container, 'warning')
    .use(deflist)
    .use(footnote)
    .use(tasklists)
    .use(anchor)
    .use(toc)
    .use(attrs)
    .use(linkAttributes, [{ pattern: /^https?:/i, attrs: { target: '_blank', rel: 'noopener' } }])
    // .use(diagrams)
    .use(mermaid)
    .use(plantuml)
    .use(prism);

md.renderer.rules.image = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const alt = token.content;
    // @ts-ignore
    const title = token.attrs[token.attrIndex('title')][1];
    // @ts-ignore
    const src = token.attrs[token.attrIndex('src')][1];

    return `<figure><a href="${src}"><img src="${src}" alt="${
        alt || title
    }"></a><figcaption>${title}</figcaption></figure>`;
};

export default (s: string): MarkdownResult => {
    const html = md.render(s);

    const htmlWithIframesAndSources = html.replace(
        /(\<iframe src="\/(demo\/[^"]*)".*\><\/iframe>)/g,
        (_match, iframe: string, filepath: string) => {
            const htmlContent = fs.readFileSync(`public/${filepath}`, 'utf-8');
            const hideCode = /data-hide-code/.test(iframe);

            const encodedHtml = htmlContent.replace(/[<>\&]/gim, function (i) {
                return '&#' + i.charCodeAt(0) + ';';
            });

            if (hideCode) {
                return iframe;
            }

            const innerHtmlSourceCode = `<pre class="language-html" style="margin: 0!important; max-height: 100%;"><code class="language-html">${encodedHtml}</code></pre>`;

            return iframe + `\n${innerHtmlSourceCode}`;
        }
    );

    return { html: htmlWithIframesAndSources, raw: s };
};
