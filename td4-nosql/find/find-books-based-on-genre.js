const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "book";

let genres = ["Fiction", "Extraordinary", "Comic", "Crime", "Western", "Horror", "Fantasy", "Horror", ];
let genre = genres[Math.floor(Math.random() * genres.length)];
let query = {
    Genre: genre
};

MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
    if (err) throw err;
    var database = db.db(datab);
    database.collection(coll).find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});