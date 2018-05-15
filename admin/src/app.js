const express = require('express');
const app = express();

const gqlRouter = require('./gql');
const nuxtRenderer = require('./nuxt');

app.use('/static/article-assets/', express.static('../dist/static/article-assets'));
app.use('/gql', gqlRouter);
app.use(nuxtRenderer);


module.exports = app;
