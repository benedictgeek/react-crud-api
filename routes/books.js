const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

/* GET home page. */
router.post('/add-book', bookController.createBook);
router.post('/edit-book', bookController.editBook);
router.get('/delete-book/:bookId', bookController.deleteBook);
router.get('/get-book/:bookId', bookController.getBook);
router.get('/get-books', bookController.getBooks);
router.get('/get-user-books/:userId', bookController.getUserBooks);

module.exports = router;
