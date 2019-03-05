const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) throw err;
    let database = db.db(dataB);
    database.collection(coll).find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});
