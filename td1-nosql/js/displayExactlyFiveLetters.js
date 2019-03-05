const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var database = db.db("td1");
  database.collection("employee").find({
    $and: [
      {name: {$regex: /^D/i}},
      {$where: 'this.name.length === 5'}
    ]
  }).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
});