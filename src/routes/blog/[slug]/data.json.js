import fs from 'fs-extra';
// import glob from 'glob-promise';
import matter from 'gray-matter';
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

import Prism from 'prismjs';

renderer.code = (code, infostring, escaped) => {
    const lang = (infostring || 'markup').toLowerCase();
    const x = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    return `<pre class="language-${lang}"><code class="language-${lang}">${x}</code></pre>`;

    // const lang = (infostring || 'markup').toLowerCase();
    // const html = Prism.highlight(code, Prism.languages[lang], lang);
    // return `<pre class="language-${lang}"><code class="language-${lang}">${html}</code></pre>`;
};

renderer.codespan = code => {
    // const lang = 'markup';
    const lang = 'sh';
    const x = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    // return `<pre class="language-${lang}"><code class="language-${lang}">${x}</code></pre>`;
    return `<code class="language-${lang}">${x}</code>`;
    // const html = Prism.highlight(code, Prism.languages[lang], lang);
    // return `<code class="language-${lang}">${html}</code>`;
    // return `<pre class="language-${lang}"><code class="language-${lang}">${html}</code></pre>`;
};

const parseMarkdown = str => {
    return marked(str, { renderer });
};

export async function get(req, res) {
    // const mdfiles = await glob('blog/*.md', { cwd: 'content' });
    // console.log('kajkald');

    // console.log('QQQ', req.query.slug);

    // res.send({ title: 'blah', abstract: 'abc', content: 'cntnt' });
    // return;

    const content = await fs.readFile(`content/blog/${req.params.slug.replace('.html', '')}.md`, 'utf-8');
    const x = matter(content);

    // console.log(content);

    res.send({ title: x.data.title, abstract: parseMarkdown(x.data.abstract), content: parseMarkdown(x.content) });

    // res.send({ mdfiles });
}
