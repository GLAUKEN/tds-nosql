const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionBook = "book";

const numberOfGenres = 2

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collectionBook).aggregate(
        [
            { 
                $group: {
                    _id : "$Genre",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]
    )
    .limit(numberOfGenres)
    .toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });

    db.close();
});
