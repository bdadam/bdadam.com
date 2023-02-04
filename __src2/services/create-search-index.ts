// import elasticlunr from 'elasticlunr';
import elasticlunr from 'lunr';
import readArticles from './read-articles';

//@ts-ignore
import Txi from 'txi';
// const Txi = require('txi');

import FlexSearch from 'flexsearch';

import MiniSearch from 'minisearch';

export default async () => {
    const articles = await readArticles();

    const idx = new MiniSearch({ fields: ['title', 'intro', 'body'] });
    idx.addAll(articles.map((a) => ({ id: a.url, title: a.title, intro: a.intro.raw, body: a.body.raw })));

    console.log(JSON.stringify(idx.toJSON()).length);

    return idx;

    // const idx = FlexSearch.create({
    //     doc: {
    //         id: 'url',
    //         field: ['title', 'intro:raw', 'body:raw'],
    //     },
    // });

    // // articles.forEach((a, id) => idx.update(id, `${a.title} ${a.intro.raw} ${a.body.raw}`));
    // // articles.forEach((a, id) => idx.add({ a }));
    // idx.add(articles);

    // return idx;

    // const idx = Txi();
    // // await Promise.all(articles.map((a) => idx.index(a.title, a.intro.raw, a.body.raw)));

    // for (const a of articles) {
    //     await idx.index(a.url, a.title, a.intro.raw, a.body.raw);
    // }

    // console.log(JSON.stringify(idx.getIndex()).length);

    // return idx;

    // await txi.index('text1', 'This has a lot of stop words in it that will be ignored as content');
    // await txi.index('text2', 'However, the storage of meanigful content is far more interesting.');

    // await txi.index('object1', { name: 'joe', address: { city: 'Seattle', state: 'WA' } });

    // await txi.index('text3', 'Go Seattle Sea Hawks!');

    console.time('build index');
    const index = elasticlunr(function () {
        // @ts-ignore
        // this.addField('url');
        // this.setRef('url');
        // // @ts-ignore
        // this.addField('title');
        // // @ts-ignore
        // this.addField('body');

        // this.saveDocument(false);

        this.field('title');
        this.field('intro');
        this.field('body');
        this.ref('url');

        articles.forEach((a) => {
            // this.add({ title: a.title, url: a.url, body: a.body.raw });
            this.add({ title: a.title, url: a.url, intro: a.intro.raw, body: a.body.raw });
        });
    });

    console.timeEnd('build index');

    return index;
};
