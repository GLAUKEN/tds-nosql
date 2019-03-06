const info = require('../config');

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {

    if (err) throw err;
    
    db.db(info.dataB).collection(info.coll).createIndex({ "surname": 1, "civility": 1 });
    console.log("Index created!");

    // In the Mongo shell, we just have to run 
    // db.collection.getIndexes() where collection = employee

    db.close();
});
