const router = require('express').Router();

const Operators = require('./dinerModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
    Operators.find()
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => res.send(err));
});

module.exports = router;
