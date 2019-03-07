const info = require('../config');

function createEmployee() {
    let employee = {
        firstName: "King",
        name : "Kong",
        email: "king.kong@gmail.com"
    }
    return employee;
}

info.MongoClient.connect(info.uri, { useNewUrlParser: true }, function(err, db) {

    if (err) throw err;
    
    db.db(info.dataB).collection(info.coll).createIndex({ "email": 1 }, {unique: true});
    console.log("Index created!");

    // we can use db.collection.getIndexes() on the mongo shell to display all the indexes unique or not
    // but since it doesn't work with nodejs
    // we will proceed with the following "method"
    
    db.db(info.dataB).collection(info.coll).insertOne(createEmployee());
    
    db.db(info.dataB).collection(info.coll).insertOne(createEmployee());

    // We get an error telling us that another document already contains this email
    // (node:3090) UnhandledPromiseRejectionWarning: MongoError: E11000 duplicate key 
    // error collection: td3.employee index: email_1 dup key: { : "king.kong@gmail.com" }

    db.close();
});
