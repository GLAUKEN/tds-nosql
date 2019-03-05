const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dataB = "td2";
const coll = "employee";

var newAddress = {
    phone: "0777777777",
    street: {
        num: "4",
        type: "Botticelli",
        city: "Courbevoie"
    }
};

// Note collection.update is deprecated

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  let database = db.db(dataB);
  try {
    database.collection(coll)
    .updateOne(
      { name: "Kradouk" },
      { $set: { address: newAddress } },
    ).limit(1);
    console.log("Update old address to the new one done !");
    db.close();
  } catch(e) {
    console.log(e);
  }
});