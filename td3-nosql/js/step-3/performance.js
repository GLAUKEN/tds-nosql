const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    let database = db.db(info.dataB);

    db.db(info.dataB).collection(info.coll).createIndex({ name: 1 });

    // In our case, the name is indexed while the firstname is not
    // We launch those requests on the mongo shell and we notice, as expected,
    // that the request on the name (indexed) processes much faster than the other

    database.collection(info.coll).find(
        {
            name: "Kradouk"
        }
    ).hint({ name: 1 }).explain("executionStats")

    database.collection(info.coll).find(
        {
            firstName: "JETLI"
        }
    ).explain("executionStats")

    db.close();
});
