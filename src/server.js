import express from 'express';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
// const dev = NODE_ENV === 'development';

express()
    .use(express.static('static'))
    .use(sapper.middleware())
    .listen(PORT || 3000);
