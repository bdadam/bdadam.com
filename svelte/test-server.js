const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`<a href="/abc.html">ABC</a>`);
});

app.get('/abc.html', (req, res) => {
    res.send(`<a href="/">Home</a>`);
});

module.exports = app;
