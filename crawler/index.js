const path = require('path');
const URL = require('url');

const fs = require('fs-extra');
const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');
const htmlMinifier = require('html-minifier');
// const htmlnano = require('htmlnano');
const PQueue = require('p-queue').default;
const app = require('../svelte/test-server');

const server = app.listen(31229);

// const baseUrl = 'https://bdadam.com';
const baseUrl = 'http://localhost:31229';
const startingPoint = ['/', '/sitemap.xml', '/rss.xml'];

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// const x = new URL.URL('https://bdadam.com/abcd.html', 'https://example.com/');

// console.log(x);

// console.log(URL.resolve('https://bdadam.com/', 'https://bdadam.com/abcd.html'));

const calcFilepathFromUrl = url => {
    const absolutePath = path.join(path.resolve(process.cwd(), './dist/export'), url);

    // console.log(absolutePath);

    if (absolutePath.endsWith('.html')) {
        return absolutePath;
    }

    if (absolutePath.endsWith('/')) {
        return `${absolutePath}index.html`;
    }

    throw new Error('Cannot calculate filepath');
};

const parseSameSiteLinks = text => {
    const $ = cheerio.load(text);
    const links = $('a')
        .toArray()
        .map(el => $(el).attr('href'))
        .filter(Boolean)
        .filter(u => u.replace(/^https:\/\/bdadam\.com/, '').startsWith('/'));

    return links;
};

const savePage = async (url, text) => {
    // const html = await htmlnano.process(text, {
    //     removeEmptyAttributes: false,
    //     collapseWhitespace: 'conservative',
    // });

    const html = htmlMinifier.minify(text, {
        collapseWhitespace: true,
        conservativeCollapse: true,
    });
    // const html = htmlMinifier.minify(pretty(text, { ocd: true }), {
    //     collapseWhitespace: true,
    //     conservativeCollapse: true,
    // });

    const filepath = calcFilepathFromUrl(url);
    const dir = path.dirname(filepath);

    console.log(`Saving ${url} => ${filepath}`);

    await fs.ensureDir(dir);
    await fs.writeFile(filepath, html);
};

const q = new PQueue();
const seen = new Map();

const crawl = async url => {
    if (seen.has(url)) {
        return;
    }

    seen.set(url, true);
    // console.log('Crawling', url);

    const response = await axiosInstance.get(url);
    const contentType = response.headers['content-type'];

    if (contentType.startsWith('text/html')) {
        const links = parseSameSiteLinks(response.data);

        links.filter(l => !seen.has(l)).forEach(url => q.add(() => crawl(url)));

        await savePage(url, response.data);
    }
};

q.add(() => crawl('/'));

q.onIdle().then(() => {
    server.close();
    console.log('Done.');
});
