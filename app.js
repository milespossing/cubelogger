const url = require('url');

console.log('starting server');

var mongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://mpossing01:SSBt5LLaP9oVZVg7ub7nkY1M3rvpqq4nilz4849pJtjUvIRya3RNmgT64IqjNh8z7AIRMxRsH1oI0y0D0yNceg%3D%3D@mpossing01.documents.azure.com:10255/?ssl=true";
mongoClient.connect(mongoUrl, function (err, client) {
  client.close();
  console.log('connected to mongo db at %s',mongoUrl);
});

const hostname = '127.0.0.1';
const port = 8080;

const express = require('express'),
    app = express();

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
