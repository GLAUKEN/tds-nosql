const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book"
const collection = "book"

let title   = 'Shokugeki no Soma';
let comment = "some comments";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collection).updateOne(
        { 
            Title: title 
        },
        { 
            $push: { 
                BuyerComment: comment
            }
        }
    );
    console.log("updated book comment based on title");
    db.close();
});