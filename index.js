'use strict';

var express = require('express');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var app = express();


/* Configuration */
app.set('view engine', 'html');
nunjucks.configure(['views', 'src/templates'], {
    autoescape: true,
    express: app,
    cache: false
});


var Datastore = require('nedb');
var db = {};
db.links = new Datastore( { filename: __dirname + '/data/links.json', autoload: true });

/* Routes */

app.use(express.static('dist'));
app.get('/', function(req, res) {
    res.sendfile(__dirname + 'dist/index.html');
});

app.get('/links', function(req, res) {
    res.render('links');
});

var router = express.Router();
router.get('/', function(req, res) {
    console.log('sdfhsjdhjk')
    db.links.find({}, function(err, docs) {
        console.log(docs);
        res.send(docs);
    });
});

router.post('/', function(req, res) {
    db.links.insert({ a: 1, b: 2 }, function(err, item) {
        if (err) {
            return next(err);
        }

        res.send(item);
    });
});

//db.links.insert({ test: 2});

app.use('/api/links', router);

app.get('/api/inspect-url', function(req, res, next) {
    var url = req.query.url;

    if (!url) {
        return res.status(404).json({});
    }

    var sc = require('./url-scraper');
    sc(url, function(err, data) {
        if (err) {
            return res.status(404).json({});;
        }

        res.json(data);
    });
});

/*eslint-disable no-unused-vars*/
app.use(function(req, res, next) {
    res.status(404).render('404');
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
/*eslint-enable no-unused-vars*/

var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening at http://127.0.0.1:%s/', server.address().port);
});
