const router = require('express').Router();

const Operators = require('./dinerModel.js');
const restricted = require('../auth/restricted.js');

router.get('/', restricted.restrictedOperator, (req, res) => {
    Operators.find()
        .then(operator => {
            res.json({ operator: operator });
        })
        .catch(err => res.send(err));
});

router.get('/:id', restricted.restrictedOperator, validateId, (req, res) => {
    res.json({ operator: req.operator })
})

router.get('/:id/trucks', restricted.restrictedOperator, validateId, (req, res) => {
    Operators.findTrucksById(req.params.id)
        .then(trucks => {
            res.json({ trucks: trucks })
        })
        .catch(err => res.status(500).json({ message: 'Failed doing get' }))
})

router.post('/:id/trucks', restricted.restrictedOperator, validateId, validateTruck, (req, res) => {
    req.body.customerRatingAvg = req.body.customerRatings.reduce((a, b) => (a + b)) / req.body.customerRatings.length;
    Operators.addTruck(req.body)
        .then(trucks => {
            res.json({ trucks: trucks })
        })
        .catch(err => res.status(500).json({ message: 'failed to add trucks', err: err }))
})

router.delete('/:id', restricted.restrictedOperator, validateId, (req, res) => {
    Operators.removeOperator(req.params.id)
        .then(operator => {
            if (operator) {
                res.status(200).json({ operator: operator })
            } else res.status(404).json({ message: 'could not find operator with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to delete operator', err: err }))
})

function validateId (req, res, next) {
    Operators.findById(req.params.id)
        .then(operator => {
            if (operator) {
                req.operator = operator
                next()
            } else res.status(404).json({ message: 'could not find operator with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to find operator' }))
}

function validateTruck (req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing truck body' })
    }
    let truck = req.body

    if (!truck.name) {
        res.status(400).json({ message: 'Missing truck name' })
    }

    if (!truck.imageOfTruck) {
        res.status(400).json({ message: 'Missing truck image' })
    }

    if (!truck.cuisineType) {
        res.status(400).json({ message: 'Missing cuisine type' })
    }

    if (!truck.customerRatings && truck.customerRatings.length < 1) {
        res.status(400).json({ message: 'Missing customer ratings' })
    }

    if (!truck.location) {
        res.status(400).json({ message: 'Missing truck location' })
    }

    if (!truck.departureTime) {
        res.status(400).json({ message: 'Missing truck departure time' })
    }

    next();
}

module.exports = router;
