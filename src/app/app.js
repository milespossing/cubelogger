const config = require('config');
const url = require('url');

require('./init').init();

console.log('starting server');

var mongoClient = require("mongodb").MongoClient;
const mongoUrl = config.get('Configuration.dbUri');
mongoClient.connect(mongoUrl, function (err, client) {
  client.close();
  console.log('connected to mongo db at %s',mongoUrl);
});

const hostname = '127.0.0.1';
const port = config.get('Configuration.port');

const express = require('express'),
    app = express();

const collection = "visitLogs";

const logger = require('./logger');
const path = require('path');
const hbs = require('express-handlebars');

const dateHelper = require('./date-helper');
const dateFormat = 'ccc LLL d h:m a';

app.engine('.hbs',hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: 'src/app/views/layouts',
    partialsDir: 'src/app/views/partials'
}));



app.set('view engine','.hbs');
app.set('views','src/app/views');
app.set('public', path.join(__dirname, '/public'));
app.use('/css',express.static('src/css'));
app.use('/js',express.static('src/js'));


app.use((request,response,next)=>{
    logger.logUrl(request.url,request.method,mongoClient,mongoUrl,'urlLogs');
    next();
});


app.get('/',function (req,res) {
    logger.readVisits(mongoClient,mongoUrl,collection,function(count,visits){
        let  formatted;
        if (visits[0]) {
            formatted = dateHelper.formatDate(visits[0],dateFormat);}
        res.render('home',{
            title: 'Simple Cube Logger!',
            name: "Miles",
            lastLog: formatted || "none"
        });
    });
});


app.get('/visits',function (req,res) {
    // res.render('views/index.html');
    logger.readVisits(mongoClient,mongoUrl,collection,function(count,visits){
        let formatted = dateHelper.formatDates(visits.reverse().slice(0,10),dateFormat);
        testOutput = {
            "title": "Visit Log",
            "count": count,
            "visits": formatted
        };
        res.render('visits',testOutput);
    });
});

app.get('/statistics',function(req,res){
    data = {
        "title": "Statistics"
    }
    res.render('statistics');
});

app.post('/', function (req,res) {
    logger.logVisit(mongoClient,mongoUrl,collection);
    redir = url.format({
        pathname:"/visits",
    });
    res.status(200);
    res.redirect(redir);
});

app.listen(port, function(){
    console.log("Example app listening at http://%s:%s/", hostname, port)
});
