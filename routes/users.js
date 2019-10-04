const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

// const passportJWTAuth = (req, res, next) => {
//     passport.authenticate('jwt', {session: false}, (err, user, info) => {
//         // if(err) {
//         //     next(err);
//         // }
//         // if(!user) {
//         //     res.status
//         // }
//         next();
//     })(req, res, next);
// }
router.post('/add-user', userController.createUser);
router.post('/edit-user/:userId', passport.authenticate('jwt'), userController.editUser);
router.post('/delete-user/:userId', passport.authenticate('jwt'), userController.deleteUser);
router.post('/login', passport.authenticate('local', {session: false}), userController.userLogin);
router.get('/verify-token', passport.authenticate('jwt', {session: false, failWithError: true}), userController.checkToken);


module.exports = router;
