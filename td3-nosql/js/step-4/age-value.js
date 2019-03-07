const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {

    if (err) throw err;
    
    let database = db.db(info.dataB);

    database.collection(info.coll).aggregate(
        [
            { $group: { _id: "$age" } }
        ]
    ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });

    db.close();
});
