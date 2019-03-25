const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book"
const collection = "book"

let vote = Math.floor(Math.random() * 11);

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collection).updateOne(
        { ISBN: { $regex: /^285/ } },
        { $push: { BuyerVote: vote }}
    );
    console.log("done");
    db.close();
});