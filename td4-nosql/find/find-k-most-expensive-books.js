const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

const k = 3;

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var database = db.db(datab);
    database.collection(coll)
        .find()
        .sort({
            Price: -1
        })
        .limit(k)
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
});