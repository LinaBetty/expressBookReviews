const express = require('express');
let books = require("./booksdb.js");
const { default: axios } = require('axios');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
//const axois = require('axios').default;


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});


// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    const listOfBook = new Promise((resolve, reject) => {
        try {
            list = JSON.stringify(books, null, 4);
            resolve(list);
        } catch (err) {
            reject(err)
        }
    });

    listOfBook.then(
        (list) => { return res.send(list) },
        (err) => console.log("Error getting list of books")
    );
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    //isbn = req.params.isbn;
    //res.send(books[isbn]);

    const listOfBook = new Promise((resolve, reject) => {
        try {
            isbn = req.params.isbn;
            book = books[isbn];
            resolve(book);
        } catch (err) {
            reject(err)
        }
    });

    listOfBook.then(
        (book) => { return res.send(book) },
        (err) => console.log("Error getting list of books")
    );
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const listOfBook = new Promise((resolve, reject) => {
        try {
            let filteredBook = [];
            author = req.params.author;
            for (let i = 1; i <= 10; i++) {
                if (books[i].author === author) {
                    filteredBook.push(books[i]);
                }
            }
            resolve(filteredBook);
        } catch (err) {
            reject(err)
        }
    });

    listOfBook.then(
        (filteredBook) => { return res.send(filteredBook) },
        (err) => console.log("Error getting list of books")
    );
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const listOfBook = new Promise((resolve, reject) => {
        try {
            let filteredBook = [];
            title = req.params.title;
            for (let i = 1; i <= 10; i++) {
                if (books[i].title === title) {
                    filteredBook.push(books[i]);
                }
            }
            resolve(filteredBook);
        } catch (err) {
            reject(err)
        }
    });

    listOfBook.then(
        (filteredBook) => { return res.send(filteredBook) },
        (err) => console.log("Error getting list of books")
    );
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
