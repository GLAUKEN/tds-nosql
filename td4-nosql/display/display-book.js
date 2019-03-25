const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book"
const collection = "book"

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collection).find().toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});