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
    layoutsDir: 'public/views/layouts',
    partialsDir: 'public/views/partials'
}));



app.set('view engine','.hbs');
app.set('views', path.join(__dirname, 'public/views'));
app.use("/styles",express.static('styles/'));

app.use((request,response,next)=>{
    logger.logUrl(request.url);
    next();
});


app.get('/',function (req,res) {
    [,visit] = logger.readVisits(1);
    res.render('home',{
        title: 'Simple Cube Logger!',
        name: "Miles",
        lastLog: visit[0] || "none"
    });
});

app.get('/visits',function (req,res) {
    // res.render('views/index.html');
    let [count,visits] = logger.readVisits();
    testOutput = {
        "title": "Visit Log",
        "count": count,
        "visits":visits};
    res.render('visits',testOutput);
    // res.redirect(redir);
});

app.post('/', function (req,res) {
    loggedTime = logger.logVisit();
    redir = url.format({
        pathname:"/visits",
    });
    res.status(200);
    res.redirect(redir);
});

app.listen(port, function(){
    console.log("Example app listening at http://%s:%s/", hostname, port)
});
