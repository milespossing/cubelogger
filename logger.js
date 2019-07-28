exports.logVisit = function(db,url,collection) {
    db.connect(url,function(err,db){
        if(err) throw err;
        let dbo = db.db('local');
        let mongoCollection = dbo.collection(collection);
        let date = Date.now();
        mongoCollection.insertOne({"time": date},function (err,res) {
            if(err) {
                return console.log(err);
            }
            console.log("logged visit: " + res);
        });
    });
};


exports.readVisits = async function(db, url, collection,callback) {
    let data;
    db.connect(url,async function(err,db){
        if(err) throw err;
        let dbo = db.db('local');
        let mongoCollection = dbo.collection(collection);
        let visits = [];
        let documents = mongoCollection.find().toArray();
        await documents.then(function(results){
            for (let i = 0; i < results.length; i++){
                let test = results[i]['time'];
                console.log(results[i]['time']);
                visits.push(new Date(results[i]['time']));
            }
        });
        let count = visits.length;
        callback(count,visits);
    });
};

exports.logUrl = function(url,method,db,mongoUrl,collection) {
    db.connect(mongoUrl,function(err,db){
        if(err) throw err;
        let dbo = db.db('local');
        let mongoCollection = dbo.collection(collection);
        mongoCollection.insertOne({"time": Date.now(),"url":url,"method":method},function (err,res) {
            if(err) throw err;
            console.log("logged url: " + res);
        });
    });
};
