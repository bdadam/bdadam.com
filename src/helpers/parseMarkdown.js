import markdownit from 'markdown-it';
import container from 'markdown-it-container';
import deflist from 'markdown-it-deflist';
import footnote from 'markdown-it-footnote';
import tasklists from 'markdown-it-task-lists';
import anchor from 'markdown-it-anchor';
import toc from 'markdown-it-toc-done-right';
import attrs from 'markdown-it-attrs';
import linkAttributes from 'markdown-it-link-attributes';
import plantuml from 'markdown-it-plantuml';
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

md.renderer.rules.image = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const alt = token.content;
    const title = token.attrs[token.attrIndex('title')][1];
    const src = token.attrs[token.attrIndex('src')][1];

    return `<figure><a href="${src}"><img src="${src}" alt="${alt ||
        title}"></a><figcaption>${title}</figcaption></figure>`;
};

export default str => md.render(str);
