const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

const numberOfPages = 1000;

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;
    var database = db.db(datab);
    database.collection(coll).find({
        Pages: {
            $gte: numberOfPages
        }
    }).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});