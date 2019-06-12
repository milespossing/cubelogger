exports.log = function() {
    const fs = require('fs');
    const dateTime = require('node-datetime');
    var dt = dateTime.create();
    let dateString = dt.format('Y-m-d H:M:S');
    fs.appendFile("c:/Log/visits.txt",dateString + '\n',function (err) {
        if(err) {
            return console.log(err);
        }
    });
    console.log("Logged visit: " + dateString);
    return dateString;
};