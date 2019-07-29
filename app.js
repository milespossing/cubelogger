const url = require('url');
const mongoClient = require('mongodb').MongoClient;

const hostname = '127.0.0.1';
const port = 3000;

const express = require('express'),
    app = express();

const mongoUrl = "mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb";
const collection = "visitLogs";

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
    logger.logUrl(request.url,request.method,mongoClient,mongoUrl,'urlLogs');
    next();
});


app.get('/',function (req,res) {
    logger.readVisits(mongoClient,mongoUrl,collection,function(count,visits){
        res.render('home',{
            title: 'Simple Cube Logger!',
            name: "Miles",
            lastLog: visits[0] || "none"
        });
    });
});

app.get('/visits',function (req,res) {
    // res.render('views/index.html');
    logger.readVisits(mongoClient,mongoUrl,collection,function(count,visits){
        testOutput = {
            "title": "Visit Log",
            "count": count,
            "visits":visits
        };
        res.render('visits',testOutput);
    });
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
