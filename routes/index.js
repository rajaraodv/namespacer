var express = require('express');
var router = express.Router();
var less = require('less');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var ns = req.query.ns;
    var cssURL = req.query.cssURL;
    if (ns && cssURL) {
        request(cssURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                less.render('.' + ns + ' { ' + body + '}', function(e, output) {
                    res.set({
                        'Content-Type': 'text/css',
                        'Content-Length': output.css.length,
                        'ETag': '12345'
                    })
                    res.send(output.css);
                });
            } else {
                res.render('index', {
                    error: error.message
                });
            }
        });
    } else {
        res.render('index', {
            error: ''
        });
    }
});

module.exports = router;