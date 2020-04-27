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
    .use(plantuml);

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

// export default (str) => md.render(str);

export default (s: string): MarkdownResult => {
    return { html: md.render(s), raw: s };
};
