const Book = require('../models/index').book;
const User = require('../models/index').user;

module.exports.createBook = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const author = req.body.author;
    const userId = req.body.userId
    Book.create({title, price, description, author, userId})
    .then(result => {
        console.log("here");
        res.send(result);
    })
    .catch(err => {
        next(err);
    })
}

module.exports.editBook = (req, res, next) => {
    const bookId = req.body.bookId;
    const price = req.body.price;
    const description = req.body.description;
    const author = req.body.author;
    
    Book.update({price, description, author}, {returning: true, where: {id: bookId}})
    .then( ([rowsUpdated, updatedBook]) => {
        res.send(updatedBook);
    })
    .catch(err => {
        next(err);
    })
}

module.exports.deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    Book.destroy({where: {id: bookId}})
    .then(result => {
        res.status(200).json({result});
    })
    .catch(err => {
        next(err);
    })
}

module.exports.getBook = (req, res, next) => {
    const bookId = req.params.bookId;

    Book.findOne({where: {id: bookId}})
    .then(book => {
        res.status(200).json(book);
    })
}

module.exports.getBooks = (req, res, next) => {
    Book.findAll()
    .then(books => {
        res.status(200).json(books);
    })
}

module.exports.getUserBooks = (req, res, next) => {
    Book.findAll({where: {userId: req.params.userId}})
    .then(userBooks => {
        res.status(200).json({status: 'Success',books: userBooks});
    })
}