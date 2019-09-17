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
        .replace(/\<!-- embed -->.*\n/, '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    if (lang === 'html' && code.includes('<!-- embed -->')) {
        const codeWithIframeStyles = `<html><head><style>
        html, body { padding: 0; margin: 0; box-sizing: border-box; }
        body {
            -webkit-font-smoothing: antialiased;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial,
                sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
            font-size: calc(1rem + 0.25vw);
            line-height: 1.38;
            color: #333;
        }
        button {
            font-size: inherit;
        }
        </style>
        </head>
        <body>
        ${code}
        </body>
        </html>`;

        const srcdoc = codeWithIframeStyles.replace(/\"/g, '&quot;');
        return `<div><iframe srcdoc="${srcdoc}"></iframe><pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre></div>`;
    }

    return `<pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre>`;
};

renderer.image = (href, caption, alt) => {
    return `<figure><img src="${href}" alt="${alt || caption}"><figcaption>${caption}</figcaption></figure>`;
};

renderer.codespan = code => {
    // const lang = 'markup';
    // const lang = 'sh';

    // const htmlSafeCode = code
    //     .replace(/&/g, '&amp;')
    //     .replace(/</g, '&lt;')
    //     .replace(/>/g, '&gt;')
    //     .replace(/"/g, '&quot;')
    //     .replace(/'/g, '&#039;');

    return `<code>${code}</code>`;
    // return `<code>${htmlSafeCode}</code>`;

    // return `<code class="language-markup">${htmlSafeCode}</code>`;
    // return `<pre class="language-${lang}"><code class="language-${lang}">${x}</code></pre>`;
    // return `<code class="language-${lang}">${htmlSafeCode}</code>`;
    // const html = Prism.highlight(code, Prism.languages[lang], lang);
    // return `<code class="language-${lang}">${html}</code>`;
    // return `<pre class="language-${lang}"><code class="language-${lang}">${html}</code></pre>`;
};

export default str => marked(str, { renderer });
