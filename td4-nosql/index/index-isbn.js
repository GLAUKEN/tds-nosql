const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionBook = "book";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);

    database.collection(collectionBook).createIndex({ "ISBN": 1 });

    console.log("Index created!");
    
    database.collection(collectionBook).indexInformation(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    db.close();
});