const info = require('./config');

info.MongoClient.connect(info.uri, {useNewUrlParser: true}, function(err, db) {
  if (err) throw err;
  let database = db.db(info.dataB);
  database.collection(info.coll).drop(function(err, res) {
    if (err) throw err;
    if (res) console.log("Collection " + info.coll + " deleted");
    db.close();
  });
});
