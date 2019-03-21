const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";

MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  let database = db.db(dataB);
  database.collection(coll).drop(function(err, res) {
    if (err) throw err;
    if (res) console.log("Collection " + coll + " deleted");
    db.close();
  });
});