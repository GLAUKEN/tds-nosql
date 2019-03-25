const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionBook = "book";

const editor = "Simba";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collectionBook).aggregate(
        [{
            $match: {
                Editor: editor
            }
        },
        {
            $group: {
                _id: "$Editor",
                avg_price: { $avg: "$Price" }
            }
        }
        ]
    )
    .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });

    db.close();
});
