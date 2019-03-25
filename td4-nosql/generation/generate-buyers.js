const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book"
const coll = "buyer"

function generateName() {
    let names = ["Martin", "Bernard", "Thomas", "Dupont", "Durand", "Gautier", "Brunet", "Adam", "Perrot", "Rodriguez"];
    return names[Math.floor(Math.random() * names.length)];
}

function generateFirstname() {
    let firstnames = ["Adrien", "Bob", "James", "Gabriel", "Camille", "Jade", "Paul", "Julia", "Théo", "Ambre"];
    return firstnames[Math.floor(Math.random() * firstnames.length)];
}

function generateCreditCardNumber() {
    let number = "";
    for (let i = 0; i < 16; i++) {
        number += Math.floor(Math.random() * 10).toString();
    }
    return number;
}

function generateCreditCard() {
    let companies = ["Visa", "Mastercard", "American Express", "Maestro"];
    CreditCard = {
        company: companies[Math.floor(Math.random() * companies.length)],
        number: generateCreditCardNumber()
    };
    return CreditCard;
}

function generatePhoneNumber() {
    let phone = "0";
    if (Math.floor(Math.random() * 2) === 0) {
        phone += "6";
    } else {
        phone += "7";
    }
    for (let i = 0; i < 8; i++) {
        let number = Math.floor(Math.random() * 10);
        phone += number.toString();
    }
    return phone;
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
        Phone   : generatePhoneNumber()
    };
    if (Math.floor(Math.random() * 2) === 0) {
        address.street = {
            StreetNumber: generateStreetNumber(),
            SteetType   : generateStreetType(),
        }
    }
    return address;
}

function hasShippingAddress() {
    return Math.floor(Math.random() * 3) === 0;
}

function isPremium() {
    return Math.floor(Math.random() * 3) === 0;
}

function generatePremium() {
    return {
        ShippingFees: false,
        Discount    : 5   // 5 euros
    };
}

function generateBuyer() {
    let buyer = {
        Name               : generateName(),
        Firstname          : generateFirstname(),
        CreditCard         : generateCreditCard(),
        PersonnalAddress   : generateAddress(),
    }

    if (hasShippingAddress()) buyer.ShippingAddress = generateAddress();
    
    return buyer;
}

function generateManyBuyers(numberOfBuyers) {
    let buyers = [];
    for (let i = 0; i < numberOfBuyers; i++) {
        buyers.push(generateBuyer());
    }
    return buyers;
}

function generation(numberOfBuyers) {
    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var database = db.db(datab);
        var buyers = generateManyBuyers(numberOfBuyers);
        database.collection(coll).insertMany(buyers, function(err, res) {
          if (err) throw err;
          console.log(res);
          console.log(numberOfBuyers + " buyers inserted!");
          db.close();
        });
    });
}

generation(4);