const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let index = require('../index.js');
//let users = index.users;

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
}

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    //console.log(users);
    let validusers = index.users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    isbn = req.params.isbn;
    review = req.body.review;
    username = req.session.authorization.username;

    console.log(username);
    books[isbn].reviews =
        {
            "user": username,
            "review": review
        };
    
    res.send("Review added to the book " + JSON.stringify(books[isbn], null, 4));
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    isbn = req.params.isbn;
    username = req.session.authorization.username;
    if(books[isbn].reviews.user === username ){
        books[isbn].reviews = {};
    }
    res.send("Review deleted on the book " + JSON.stringify(books[isbn], null, 4));
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
//module.exports.users = users;
