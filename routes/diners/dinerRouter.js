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

//delete
router.delete('/:id', restricted.restrictedOperator, validateId, (req, res) => {
    Diners.removeDiner(req.params.id)
        .then(diner => {
            if (diner) {
                res.status(200).json({ diner: diner })
            } else res.status(404).json({ message: 'could not find diner with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to delete diner', err: err }))
})

module.exports = router;
