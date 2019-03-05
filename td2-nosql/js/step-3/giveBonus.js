const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";
const amount = 100;

var cities = ["Toulouse", "Bordeaux", "Paris"];

// Note : update( { multi: boolean } ) is deprecated

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let database = db.db(dataB);
  try {
    database.collection(coll)
    .updateMany(
      {
      bonus: { $exists: false },
      "address.street": { $exists: true },
      "address.street.city": { $nin: cities }
      },
      { $set: { bonus: amount } }
    );
    console.log("Bonus added to those who didn't have one");
  } catch(e) {
    console.log(e);
  }
  db.close();
});