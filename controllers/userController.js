const User = require('../models/index').user;

module.exports.createUser = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    User.create(
        {
           name,email, password
        }
    )
    .then(result => {
        res.send(result);
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
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({where: {email, password}})
    .then(result => {
        console.log(result);
        res.status(200).json({user : result})
    })
}