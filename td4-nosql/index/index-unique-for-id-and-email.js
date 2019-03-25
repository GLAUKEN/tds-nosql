const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionSeller = "seller";
const collectionBuyer = "buyer";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    db.db(datab).collection(collectionSeller).createIndex({ "Id": 1 }, { unique: true });
    console.log("Unique index created!");
    db.close();
});

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    db.db(datab).collection(collectionBuyer).createIndex({ "Email": 1 }, { unique: true });
    console.log("Unique index created!");
    db.close();
});