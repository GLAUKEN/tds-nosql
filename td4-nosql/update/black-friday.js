const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

const percentage = 0.8;
const days = 2;
const price = 4;

MongoClient.connect(url, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(coll).updateMany({}, {
        $set: {
            Promotion: {
                rate: percentage,
                durationInDays: days,
                promotion: price
            }
        }
    });
    console.log("All books are in promotion now");
    db.close();
});