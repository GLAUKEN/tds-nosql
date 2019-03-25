const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionSeller = "seller";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    db.db(datab).collection(collectionSeller).createIndex({ "Id": 1, "Name": 1 });
    console.log("Composed index created!");
    db.close();
});