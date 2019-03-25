const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost:27017/";
const datab = "book"
const collectionBook = "book"
const collectionSeller = "seller";
const sellerId = 3;

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

function insertBook(sellerId) {
    var book = generateBook(sellerId);

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        var database = db.db(datab);
        database.collection(collectionBook).insertOne(book, function(err, res) {
          if (err) throw err;
          console.log("New book inserted!");
          db.close();
        });
    });

    MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
        if (err) throw err;
        let database = db.db(datab);
        database.collection(collectionSeller).updateOne(
            { Id: sellerId },
            { $push: { Books: book }}
        );
        console.log("updated seller list of books");
        db.close();
    });
}

insertBook(sellerId);