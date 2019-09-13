const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


router.post('/add-user', userController.createUser);
router.post('/edit-user/:userId', userController.editUser);
router.post('/delete-user/:userId', userController.deleteUser);
router.post('/login', userController.userLogin);


module.exports = router;
