exports.logVisit = function() {
    const fs = require('fs');
    const dateTime = require('node-datetime');
    var dt = dateTime.create();
    let dateString = dt.format('Y-m-d H:M:S');
    fs.appendFile("Log/visits.txt",dateString + '\n',function (err) {
        if(err) {
            return console.log(err);
        }
    });
    console.log("Logged visit: " + dateString);
    return dateString;
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