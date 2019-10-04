const User = require('../models/index').user;
const jwt = require('jsonwebtoken');
const secret = 'some soft password in place';

module.exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    User.create(
        {
           name,email, password
        }
    )
    .then(result => {
        res.status(200).json({status: 200, result: result});
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports.editUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.update({name, email, password}, {returning: true, where: {id: req.params.userId}})
    .then(([rowsUpdated, userUpdated]) => {
        res.send(userUpdated);
    })
}

module.exports.deleteUser = (req, res, next) => {
    User.destroy({where: {id: req.params.userId}})
    .then(result => {
        res.send(result);
    })
}

module.exports.userLogin = (req, res, next) => {
    if(!req.user) {
        res.status(500).send('Bad error occured');
    }
    
    const token = jwt.sign({
        id: req.user.id
    }, secret)
    res.status(200).json({token, user: req.user});

    // const email = req.body.email;
    // const password = req.body.password;
    // User.findOne({where: {email, password}})
    // .then(result => {
    // })
}

module.exports.checkToken = (req, res, next) => {
    if(!req.user) {
        res.status(500).send('Bad error occured');
    }

    res.status(200).json({status: 200, user: req.user});
}