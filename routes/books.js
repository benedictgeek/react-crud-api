const express = require('express');
const router = express.Router();
const passport =require('passport');

const bookController = require('../controllers/bookController');

/* GET home page. */

//set custom passport response


router.post('/add-book', passport.authenticate('jwt', {session: false}), bookController.createBook);
router.post('/edit-book', passport.authenticate('jwt', {session: false}), bookController.editBook);
router.get('/delete-book/:bookId', passport.authenticate('jwt', {session: false}), bookController.deleteBook);
router.get('/get-book/:bookId', passport.authenticate('jwt', {session: false}), bookController.getBook);
router.get('/get-books', passport.authenticate('jwt', {session: false}), bookController.getBooks);
router.get('/get-user-books', passport.authenticate('jwt', {session: false}), bookController.getUserBooks);

module.exports = router;
