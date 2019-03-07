const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {

    if (err) throw err;
    
    let database = db.db(info.dataB);

    // Doesn't actually work but that's the idea

    database.collection(info.coll).aggregate(
        [
            { $group: { _id: "$age" } },
            { $sort: { age : 1 } }
        ]
    ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });

    db.close();
});
