const logFile = "Log/visits.txt";

exports.logVisit = function() {
    const fs = require('fs');
    const dateTime = require('node-datetime');
    let dt = dateTime.create();
    let dateString = dt.format('Y-m-d H:M:S');
    fs.appendFile(logFile,dateString + '\n',function (err) {
        if(err) {
            return console.log(err);
        }
    });
    console.log("Logged visit: " + dateString);
    return dateString;
};

exports.readVisits = function(len = 10) {
    const fs = require('fs');
    let visits = fs.readFileSync(logFile, 'utf8');
    let output = visits.split("\n");
    output = output.reverse();
    output.splice(0,1);
    let count = output.length;
    return [count, output.slice(0, len)];
};

exports.logUrl = function(url) {
    const fs = require('fs');
    const dateTime = require('node-datetime');
    var dt = dateTime.create();
    let dateString = dt.format('Y-m-d H:M:S');
    let entry = url + ',' + dateString;
    fs.appendFile("Log/url.txt",entry + '\n',function (err) {
        if(err) {
            return console.log(err);
        }
    });
    console.log("Logged url: " + entry);
    return dateString;
};