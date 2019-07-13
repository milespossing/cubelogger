const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;
const express = require('express'),
    app = express();

const logger = require('./logger');

const path = require('path');
const exphbs = require('express-handlebars');

app.engine('.hbs',exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'public/views/layouts'
}));

app.set('view engine','.hbs');
app.set('views', path.join(__dirname, 'public/views'));

app.use((request,response,next)=>{
    logger.logUrl(request.url);
    next();
});

// app.use('/static',express.static('public/css/bootstrap/css'));

app.get('/',function (req,res) {
    res.render('home',{
        name: "Miles"
    });
});

app.get('/visits',function (req,res) {
    // res.render('views/index.html');
    testOutput = {"test":[1,2,3]};
    res.json(testOutput);
    // res.redirect(redir);
});

app.post('/', function (req,res) {
    loggedTime = logger.logVisit();
    redir = url.format({
        pathname:"/",
        query: {'time': loggedTime}
    });
    res.status(200);
    // res.redirect(redir);
});

app.listen(port, function(){
    console.log("Example app listening at http://%s:%s", hostname, port)
});
