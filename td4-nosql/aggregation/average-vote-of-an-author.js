const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionBook = "book";

function generateAuthorName() {
    let names = ["J.K. Rowling", "J.R.R Tolkien", "William Shakespeare", "Sarah Williams", "Arthur Conan Doyle", "H.P. Lovecraft"];
    return names[Math.floor(Math.random() * names.length)];
}

const author = generateAuthorName();

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(datab);
    database.collection(collectionBook).aggregate(
        [
            { $match: { Author: author } },
            { $unwind: "$BuyerVote"},
            { $group:
                {
                    _id: "$BuyerVote",
                    averageVote: { $avg: "$BuyerVote" }
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
