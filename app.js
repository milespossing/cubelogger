const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
const express = require('express'),
    app = express();

app.use(express.static('public'));
// app.use('/static',express.static('public/css/bootstrap/css'));

app.get('/',function (req,res) {
    // res.render('views/index.html');
    redir = url.format({
        pathname:'/views/index.html',
        query: req.query
    });
    res.redirect(redir);
});

const logger = require('./logger');

app.post('/', function (req,res) {
    loggedTime = logger.log();
    redir = url.format({
        pathname:"/",
        query: {'time': loggedTime}
    });
    res.redirect(redir);
});

app.listen(port, function(){
    console.log("Example app listening at http://%s:%s", hostname, port)
});
