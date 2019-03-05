const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var database = db.db("td1");
    database.collection("employee").find(
      {"entry-date": {$lt: 2009}},
      {"firstName": 0, "name": 1, "surname": 1, "address": 0, "civility": 0,
      "age": 0,"entry-date": 0, "salary": 0}
      ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});