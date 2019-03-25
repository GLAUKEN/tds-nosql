const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collection = "buyer";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collection).drop(function(err, res) {
        if (err) throw err;
        if (res) console.log("Collection " + collection + " deleted");
        db.close()
    });
});