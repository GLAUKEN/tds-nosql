const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {

    if (err) throw err;
    
    let database = db.db(info.dataB);

    database.collection(info.coll).aggregate(
        [
            { $match: { "address.city": "Paris" } },
            { $group: { _id: "$address.district" } }
        ]
    );

    db.close();
});
