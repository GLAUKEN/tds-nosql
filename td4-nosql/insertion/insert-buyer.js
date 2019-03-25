const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const datab = "book";
const coll = "buyer";

function generateName() {
    let names = ["Martin", "Bernard", "Thomas", "Dupont", "Durand", "Gautier", "Brunet", "Adam", "Perrot", "Rodriguez"];
    return names[Math.floor(Math.random() * names.length)];
}

function generateFirstname() {
    let firstnames = ["Adrien", "Bob", "James", "Gabriel", "Camille", "Jade", "Paul", "Julia", "Théo", "Ambre"];
    return firstnames[Math.floor(Math.random() * firstnames.length)];
}

function generateStreetNumber() {
    return 1 + Math.floor(Math.random() * 19);
}

function generateStreetType() {
    let types = ["rue", "allée", "boulevard", "avenue", "chemin"];
    let rand = Math.floor(Math.random() * types.length);
    return types[rand];
}

function generateCity() {
    let cities = ["Paris", "Toulouse", "Nancy", "Metz", "Nice", "Montpellier"];
    let rand = Math.floor(Math.random() * cities.length);
    return cities[rand];
}

function generateDistrict() {
    return Math.floor(Math.random() * 20 + 1);
}

function generateAddress() {
    let address = {
        City    : generateCity(),
        District: generateDistrict(),
    };
    if (Math.floor(Math.random() * 2) === 0) {
        address.street = {
            StreetNumber: generateStreetNumber(),
            SteetType   : generateStreetType(),
        };
    }
    return address;
}

function generateBuyer() {
    return {
        Name               : generateName(),
        Firstname          : generateFirstname(),
        PersonnalAddress   : generateAddress(),
    };
}

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var database = db.db(datab);
    let query = generateBuyer();
    database.collection(coll).insertOne(query);
    console.log("New buyer inserted!");
    db.close();
});