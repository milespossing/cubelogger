const luxon = require('luxon');

exports.formatDates = function(dates,format){
    let output = new Array();
    dates.forEach(date => {
        output.push(exports.formatDate(date,format));
    });
    return output;
}

exports.formatDate = function(date,format){
    let luxDate = luxon.DateTime.fromJSDate(date);
    let output = luxDate.toFormat(format);
    return output;
};
