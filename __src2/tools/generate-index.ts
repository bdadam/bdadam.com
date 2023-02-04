#!/usr/bin/env -S npx ts-node --project tsconfig.tools.json

import generateSearchIndex from '../services/create-search-index';

const run = async () => {
    const index = await generateSearchIndex();

    // console.log(JSON.stringify(index.toJSON()).length);

    // console.log(index);

    // const x = await index.search('canvas');
    // const x = await index.search('canvs');
    // const x = await index.search('event');

    // console.log(x);

    // @ts-ignore
    // console.log(index.autoSuggest('javascript canv'));
    console.log(index.search('jquery', { prefix: true, fuzzy: 0.2 }));
};

run();
