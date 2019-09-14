import marked from 'marked';

const renderer = new marked.Renderer();

renderer.link = (href, title, text) => {
    if (href.startsWith('https://www.youtube.com/embed/')) {
        return `<div class="youtube-player"><iframe src="${href}"></iframe></div>`;
    }

    const internal = href.startsWith('https://bdadam.com/') || href.startsWith('/');

    const target = internal ? '' : 'target="_blank"';
    const rel = internal ? '' : 'rel="external noopener"';

    return `<a href="${href}" title="${title || ''}" ${target} ${rel}>${text || ''}</a>`;
};

renderer.code = (code, infostring, escaped) => {
    const lang = (infostring || 'markup').toLowerCase();
    const htmlSafeCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    return `<pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre>`;
};

renderer.image = (href, caption, alt) => {
    return `<figure><img src="${href}" alt="${alt || caption}"><figcaption>${caption}</figcaption></figure>`;
};

renderer.codespan = code => {
    // const lang = 'markup';
    // const lang = 'sh';

    const htmlSafeCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    // return `<code class="language-markup">${htmlSafeCode}</code>`;
    // return `<pre class="language-${lang}"><code class="language-${lang}">${x}</code></pre>`;
    return `<code>${htmlSafeCode}</code>`;
    // return `<code class="language-${lang}">${htmlSafeCode}</code>`;
    // const html = Prism.highlight(code, Prism.languages[lang], lang);
    // return `<code class="language-${lang}">${html}</code>`;
    // return `<pre class="language-${lang}"><code class="language-${lang}">${html}</code></pre>`;
};

export default str => marked(str, { renderer });
