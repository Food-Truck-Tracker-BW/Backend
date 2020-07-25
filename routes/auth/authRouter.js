const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/userModel.js');

const secrets = require('../../config/secrets');
const e = require('express');

router.post('/register', validateUser, (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });

});

router.post('/login', (req, res) => {
    let { username, password } = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({
                    username: user.username,
                    token: token
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


function generateToken (user) {
    const payload = {
        username: user.username,
        is_operator: user.is_operator
    };
    const options = {
        expiresIn: '1d',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

function validateUser (req, res, next) {
    if (!req.body) {
        res.status(400).json({
            message: 'Missing user body in request'
        })
    } else if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({
            message: 'Please provide a username, email and password!'
        })
    } else next()
}

module.exports = router;