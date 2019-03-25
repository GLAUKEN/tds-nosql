const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book";
const collectionBook = "book";
const collectionSeller = "seller";

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
    return parseInt(number, 10);
}

function generateCreditCard() {
    let companies = ["Visa", "Mastercard", "American Express", "Maestro", ];
    CreditCard = {
        company: companies[Math.floor(Math.random() * companies.length)],
        number: generateCreditCardNumber()
    }
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
    }
    if (Math.floor(Math.random() * 2) === 0) {
        address.street = {
            StreetNumber: generateStreetNumber(),
            SteetType   : generateStreetType(),
        }
    }
    return address;
}

function generateAuthorName() {
    let names = ["J.K. Rowling", "J.R.R Tolkien", "William Shakespeare", "Sarah Williams", "Arthur Conan Doyle", "H.P. Lovecraft"];
    return names[Math.floor(Math.random() * names.length)];
}

function generateTitle() {
    let titles = ["Toriko", "Shokugeki no Soma", "Fairy Tails", "Seven Deadly Sins", "Harry Potter", "Peaky Blinders", "The Lord of the Rings", "Alice in Wonderland"];
    return titles[Math.floor(Math.random() * titles.length)];
}

function generateGenre() {
    let genres = ["Fiction", "Extraordinary", "Comic", "Crime", "Western", "Horror", "Fantasy", "Horror", "Action"];
    return genres[Math.floor(Math.random() * genres.length)];
}

function generateEditor() {
    let editors = ["Abdoul", "Simba", "Bamboula", "Bob", "Simba", "Bruce"];
    return editors[Math.floor(Math.random() * editors.length)];
}

function generateYear() {
    return Math.floor(1980 + Math.random() * 39);
}

function generateMonth() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[Math.floor(Math.random() * 12)];
}

function generateDay() {
    return Math.floor(1 + Math.random() * 31);
}

function generatePublicationDate() {
    return {
        Day: generateDay(),
        Month: generateMonth(),
        Year: generateYear()
    };
}

function generateISBN() {
    let dom         = Math.floor(Math.random() * 1000);
    let editor      = Math.floor(Math.random() * 10000);
    let publication = Math.floor(Math.random() * 10000);
    let key         = Math.floor(Math.random() * 100);
    return dom + "-" + editor + "-" + publication + "-" + key;
}

function generatePrice() {
    return Math.floor(10 + Math.random() * 290);
}

function generateNumberOfPages() {
    return Math.floor(100 + Math.random() * 1900);
}

function generateWeight() {
    return Math.floor(5 + Math.random() * 20) / 10;
}

function generateSize() {
    return {
        height: Math.floor(20 + Math.random() * 11),
        width: Math.floor(15 + Math.random() * 11)
    }
}

function generateSellerComment() {
    let comments = [
        "If you hate to know the end before it comes, this plot twists based book will satisfy you !",
        "If you seek an environnement Sherlock Holmes like, then get into this book",
        "The atmosphere generated will satisfy everyone who seek suspense, violence and fear"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
}

function isInPromotion() {
    return Math.floor(Math.random() * 5) === 0;
}

function generateDurationInDays() {
    return Math.floor(1 + Math.random() * 29);
}

function generatePromotion(initialPrice) {
    let percentage = Math.floor(1 + Math.random() * 6) / 10;
    return { 
        rate: percentage,
        durationInDays: generateDurationInDays(),
        promotion: initialPrice * (1 - percentage)
    };
}

function hasBuyerComment() {
    return Math.floor(Math.random() * 3) === 0;
}

function hasBuyerVote() {
    return Math.floor(Math.random() * 3) === 0;
}

function generateBuyerComment() {
    let comments = [
        "Excellent book, I was litteraly absorbed by the story and the atmosphere was perfect !! I recommend 1000 times !",
        "Great, the suspense is good but the plot twist was disappointing",
        "Neither good nor bad",
        "Worst book I ever read, can't even go further than the 10th page, litteraly a waste of time"
    ];
    return comments[Math.floor(Math.random() * comments.length)];
}

function generateBuyerVote() {
    return Math.floor(Math.random() * 11);
}

function generateEmailClient() {
    let clients = ["gmail", "yahoo", "devinci", "orange", "free"];
    return clients[Math.floor(Math.random() * clients.length)];
}

function generateEmail(firstname, name) {
    let number = Math.floor(Math.random() * 1000000);
    let client = generateEmailClient();
    return firstname + "." + name + number.toString() + "@" + client + ".com";
}

function generateSeller(id) {
    let seller = {
        Id                 : id,
        Name               : generateName(),
        Firstname          : generateFirstname(),
        CreditCard         : generateCreditCard(),
        PersonnalAddress   : generateAddress(),
        Books              : []
    }
    seller.Email = generateEmail(seller.Firstname, seller.Name);
    return seller;
}

function generateBook(sellerId) {
    let book = {
        SellerId     : sellerId,
        Author       : generateAuthorName(),
        Title        : generateTitle(),
        Genre        : generateGenre(),
        Editor       : generateEditor(),
        Date         : generatePublicationDate(),
        ISBN         : generateISBN(),
        Price        : generatePrice(),
        Pages        : generateNumberOfPages(),
        Weight       : generateWeight(),
        Size         : generateSize(),
        SellerComment: generateSellerComment(),
    };

    if (isInPromotion())   book.Promotion    = generatePromotion(book.Price);
    if (hasBuyerComment()) book.BuyerComment = [generateBuyerComment()];
    if (hasBuyerVote())    book.BuyerVote    = [generateBuyerVote()];

    return book;
}

function generateSellerAndBook(id) {
    let seller = generateSeller(id);
    let book   = generateBook(id);
    seller.Books.push(book);
    return {
        Seller: seller,
        Book: book
    };
}

function generateManySellersAndBooks(numberOfSellersAndBooks) {
    let sellers = [];
    let books   = [];
    for (let i = 0; i < numberOfSellersAndBooks; i++) {
        let sellerAndBook = generateSellerAndBook(i + 1);
        sellers.push(sellerAndBook.Seller);
        books.push(sellerAndBook.Book);
    }
    return {
        Sellers: sellers,
        Books  : books
    };
}

function generation(numberOfSellersAndBooks) {
    var sellersAndBooks = generateManySellersAndBooks(numberOfSellersAndBooks);

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var database = db.db(datab);
        database.collection(collectionSeller).insertMany(sellersAndBooks.Sellers, function(err, res) {
          if (err) throw err;
          console.log(res);
          console.log(numberOfSellersAndBooks + " sellers inserted!");
          db.close();
        });
    });

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var database = db.db(datab);
        database.collection(collectionBook).insertMany(sellersAndBooks.Books, function(err, res) {
          if (err) throw err;
          console.log(res);
          console.log(numberOfSellersAndBooks + " books inserted!");
          db.close();
        });
    });
}

generation(4)