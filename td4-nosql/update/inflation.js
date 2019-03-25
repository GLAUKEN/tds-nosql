const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

const inflation = 100; // 100 euros

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(coll).updateMany({}, {
        $inc: {
            Price: inflation
        }
    });
    console.log("Inflation is striking ! :(");
    db.close();
});