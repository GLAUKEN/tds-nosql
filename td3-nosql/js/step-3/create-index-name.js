const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(info.dataB);

    db.db(info.dataB).collection(info.coll).createIndex({ "name": 1 });
    console.log("Index created!");
    
    database.collection(info.coll).indexInformation(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    db.close();
});
