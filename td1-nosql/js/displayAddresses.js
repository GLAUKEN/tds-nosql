const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var database = db.db("td1");
    database.collection("employee").find(
        {"address.street": {$exists: true, $ne: null}},
        {"firstName.$": 0, "name.$": 1, "surname.$": 0, "address.$": 1, "civility.$": 0,
        "age.$": 0, "entry-date.$": 0, "salary.$": 0}
    ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});