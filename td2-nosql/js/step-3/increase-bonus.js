const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";
const increase = 200;

// Note : update( { multi: boolean } ) is deprecated

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let database = db.db(dataB);
  try {
    database.collection(coll)
    .updateMany(
      { bonus: { $exists: true } },
      { $inc: { bonus: increase } }
    );
    console.log("Bonus increased");
  } catch(e) {
    console.log(e);
  }
  db.close();
});