const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var database = db.db(datab);
    database.collection(coll).find(
        {
            Promotion: { $exists: true }
        },
        { 
            Author:        0,
            Title:         0,
            Genre:         0,
            Date:          0,
            ISBN:          0,
            Price:         0,
            Pages:         0,
            Weight:        0,
            Size:          0,
            SellerComment: 0,
            BuyerComment:  0,
            BuyerVote:     0,
            Promotion:     1
        }
    ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});