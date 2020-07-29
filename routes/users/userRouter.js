const router = require('express').Router();

const Users = require('./userModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted.restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => res.send(err));
});

router.get('/getDiners', (req, res) => {
    Users.findDinerOrOperators(0)
        .then(user => {
            res.json({ diners: user });
        })
        .catch(err => res.send(err));
});

router.get('/getOperators', (req, res) => {
    Users.findDinerOrOperators(1)
        .then(user => {
            res.json({ operators: user });
        })
        .catch(err => res.send(err));
});

router.get('/:id', restricted.restricted, validateId, (req, res) => {
    res.json({ user: req.user })
})

router.get('/:id/trucks', restricted.restricted, validateId, (req, res) => {
    Users.findTrucksById(req.params.id)
        .then(trucks => {
            res.json({ trucks: trucks })
        })
        .catch(err => res.status(500).json({ message: 'Failed doing get' }))
})

router.post('/:id/trucks', restricted.restrictedOperator, validateId, validateTruck, (req, res) => {
    // req.body.customerRating = req.body.customerRatings.reduce((a, b) => (a + b)) / req.body.customerRatings.length;
    Users.addTruck(req.body, req.params.id)
        .then(trucks => {
            res.json({ trucks: trucks })
        })
        .catch(err => res.status(500).json({ message: 'failed to add trucks', err: err }))
})

router.delete('/:id', restricted.restricted, validateId, (req, res) => {
    Users.removeuser(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json({ user: user })
            } else res.status(404).json({ message: 'could not find user with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to delete user', err: err }))
})

function validateId (req, res, next) {
    Users.findById(req.params.id)
        .then(user => {
            if (user) {
                req.user = user
                next()
            } else res.status(404).json({ message: 'could not find user with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to find user' }))
}

function validateTruck (req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing truck body' })
    }
    let truck = req.body

    if (!truck.name) {
        res.status(400).json({ message: 'Missing truck name' })
    }

    if (!truck.image) {
        res.status(400).json({ message: 'Missing truck image' })
    }

    if (!truck.cuisineType) {
        res.status(400).json({ message: 'Missing cuisine type' })
    }

    // if (!truck.customerRatings && truck.customerRatings.length < 1) {
    //     res.status(400).json({ message: 'Missing customer ratings' })
    // }

    if (!truck.location) {
        res.status(400).json({ message: 'Missing truck location' })
    }

    if (!truck.departureTime) {
        res.status(400).json({ message: 'Missing truck departure time' })
    }

    next();
}

module.exports = router;
