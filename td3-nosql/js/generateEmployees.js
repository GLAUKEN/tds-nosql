const info = require('./config');

function generateRandomName() {
    let names = ["Dominique", "Assan", "David", "Mamadou", "Kradouk", "Sarah",
                "Sophie", "Adda", "Alfred", "Ted", "Bonobo"];
    let rand = Math.floor(Math.random() * names.length);
    return names[rand];
}

function generateRandomFirstName() {
    let firstNames = ["JETLI", "OPPO", "GOLIATH", "ABDOUL", "KRADOUK", "DA", "PAD"];
    let rand = Math.floor(Math.random() * firstNames.length);
    return firstNames[rand];
}

function generateRandomSurname() {
    let surnames = ["Mars", "Neptune", "Jupiter", "Saturne"];
    let rand = Math.floor(Math.random() * surnames.length);
    return surnames[rand];
}

function generateEmail(name, firstname) {
    return firstname + '.' + name + '@gmail.com';
}

function generateRandomCivility() {
    let civilities = ["Monsieur", "Madame"];
    let rand = Math.floor(Math.random() * civilities.length);
    return civilities[rand];
}

function generateRandomAge() {
    return Math.floor(Math.random() * 70);
}

function generateRandomEntryDate() {
    return 1980 + Math.floor(Math.random() * (2019 - 1980));
}

function generateRandomSalary() {
    return 2000 + Math.floor(Math.random() * 8000);
}

function hasBonus() {
    return Math.floor(Math.random() * 5) === 0;
}

function generateRandomBonus() {
    return 100 + Math.floor(Math.random() * 200);
}

function generateRandomPhoneNumber() {
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

function generateRandomStreetNum() {
    return 1 + Math.floor(Math.random() * 19);
}

function generateRandomStreetType() {
    let types = ["rue", "allée", "boulevard", "avenue", "chemin"];
    let rand = Math.floor(Math.random() * types.length);
    return types[rand];
}

function generateRandomCity() {
    let cities = ["Paris", "Toulouse", "Nancy", "Metz", "Nice", "Montpellier"];
    let rand = Math.floor(Math.random() * cities.length);
    return cities[rand];
}

function generateRandomAddress() {
    let address = {
        "phone": generateRandomPhoneNumber()
    }
    if (Math.floor(Math.random() * 2) === 0) {
        address.street = {
            "num": generateRandomStreetNum(),
            "type": generateRandomStreetType(),
            "city": generateRandomCity()
        }
    }
    return address;
}

function generateEmployee() {
    let employee = {
        "firstName": generateRandomFirstName(),
        "name": generateRandomName(),
        "surname": generateRandomSurname(),
        "address": generateRandomAddress(),
        "civility": generateRandomCivility(),
        "age": generateRandomAge(),
        "entry-date": generateRandomEntryDate(),
        "salary": generateRandomSalary()
    }
    employee.email = generateEmail(employee.name, employee.firstName);
    if ((2019 - employee["entry-date"] > 2)  && hasBonus()) {
        employee.bonus = generateRandomBonus();
    }
    return employee;
}

function generateManyEmployees(numberOfEmployees) {
    let employees = [];
    for (let i = 0; i < numberOfEmployees; i++) {
        let employee = generateEmployee();
        employees.push(employee);
    }
    return employees;
}

function generation(numberOfEmployees) {
    info.MongoClient.connect(info.uri, {useNewUrlParser: true}, function(err, db) {
        if (err) throw err;
        var database = db.db(info.dataB);
        var employees = generateManyEmployees(numberOfEmployees);
        database.collection(info.coll).insertMany(employees, function(err, res) {
          if (err) throw err;
          console.log(numberOfEmployees + " employees inserted!");
          db.close();
        });
    });
}

generation(100000);
