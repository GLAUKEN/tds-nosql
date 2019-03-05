const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";
const lim = 3;

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let database = db.db(dataB);
  let query = {
    'entry-date': 1
  };
  database.collection(coll).find().sort(query).limit(lim)
  .toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});