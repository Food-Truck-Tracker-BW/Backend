const router = require('express').Router();

const Diners = require('./dinerModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted, (req, res) => {
    Diners.find()
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => res.send(err));
});

module.exports = router;
