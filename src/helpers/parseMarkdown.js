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
    const lang = (infostring || 'markup').toLowerCase().split(' ')[0];

    const htmlSafeCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    if (lang === 'html' && infostring.split(' ')[1] === 'embed') {
        return (
            code.replace(/\<script/g, '<script type="noexec"') +
            `<pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre>`
        );
    }

    // if (lang === 'html' && code.includes('<!-- embed -->')) {
    //     const codeWithIframeStyles = `<html><head><style>
    //     *,*::before,*::after { box-sizing: border-box; }
    //     * { margin: 0; padding: 0; }
    //     html, body { padding: 0; margin: 0; box-sizing: border-box; overflow-x: hidden; }
    //     body {
    //         -webkit-font-smoothing: antialiased;
    //         font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial,
    //             sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    //         font-size: calc(1rem + 0.25vw);
    //         line-height: 1.38;
    //         color: #333;
    //     }
    //     button {
    //         font-size: inherit;
    //         padding: 4px 16px;
    //         border-radius: 4px;
    //         border: 1px solid #aaa;
    //         background-color: #f1f1f1;
    //     }
    //     button:hover {
    //         background-color: #dedede;
    //     }
    //     </style>
    //     </head>
    //     <body>
    //     ${code}
    //     </body>
    //     </html>`;

    //     const srcdoc = codeWithIframeStyles.replace(/\"/g, '&quot;');
    //     return `<div><iframe srcdoc="${srcdoc}"></iframe><pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre></div>`;
    // }

    return `<pre class="language-${lang}"><code class="language-${lang}">${htmlSafeCode}</code></pre>`;
};

renderer.image = (href, caption, alt) => {
    return `<figure><a href="${href}"><img src="${href}" alt="${alt ||
        caption}"></a><figcaption>${caption}</figcaption></figure>`;
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
