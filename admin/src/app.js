const app = require('express')();

const gqlRouter = require('./gql');
const nuxtRenderer = require('./nuxt');

app.use('/gql', gqlRouter);
app.use(nuxtRenderer);


module.exports = app;
