const router = require('express').Router();

const Trucks = require('./truckModel.js');
const restricted = require('../auth/restricted.js');

//gets
router.get('/', (req, res) => {
    Trucks.find()
        .then(trucks => {
            res.status(200).json({ trucks: trucks });
        })
        .catch(err => res.send(err));
});

router.get('/:id', validateId, (req, res) => {
    res.status(200).json({ truck: req.truck });
});

router.get('/:id/menus', validateId, (req, res) => {
    Trucks.findMenus(req.params.id)
        .then(menus => {
            res.status(200).json({ menus: menus });
        })
        .catch(err => res.send(err));
});

router.get('/:id/location', validateId, (req, res) => {
    Trucks.findLocation(req.params.id)
        .then(menus => {
            res.status(200).json({ location: location });
        })
        .catch(err => res.send(err));
});

router.get('/:id/avgRatings', validateId, (req, res) => {
    Trucks.getAvgRating(req.params.id)
        .then(rating => {
            res.status(200).json({ rating: rating });
        })
        .catch(err => res.send(err))
})

router.get('/menu/:itemId', validateId, (req, res) => {
    Trucks.getItem(req.params.itemId)
        .then(item => {
            res.status(200).json({ item: item });
        })
        .catch(err => res.send(err))
})

router.get('/menu/:itemId/itemAvgRatings', validateId, (req, res) => {
    Trucks.getItemAvgRating(req.params.itemId)
        .then(rating => {
            res.status(200).json({ rating: rating });
        })
        .catch(err => res.send(err))
})

//post 

router.post('/:id', restricted.restrictedOperator, validateId, validateTruck, (req, res) => {
    Trucks.addMenu(req.body, req.params.id)
        .then(menu => {
            res.status(201).json({ menu: menu })
        })
        .catch(err => res.send(err))
});

router.post('/:id/addMenuItem', restricted.restrictedOperator, validateId, validateMenuItems, (req, res) => {
    Trucks.addMenu(req.body, req.params.id)
        .then(menu => {
            res.status(201).json({ menu: menu })
        })
        .catch(err => res.send(err))
});

//put
router.put('/:id', restricted.restrictedOperator, validateId, validateTruck, (req, res) => {
    Trucks.updateTruck(req.params.id, req.body)
        .then(trucks => res.status(200).json({ trucks: trucks }))
})

//delete
router.delete('/:id', restricted.restrictedOperator, validateId, (req, res) => {
    Trucks.removeTruck(req.params.id)
        .then(truck => {
            if (truck) {
                res.status(200).json({ truck: truck })
            } else res.status(404).json({ message: 'could not find truck with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to delete truck', err: err }))
})

//middleware
function validateId (req, res, next) {
    Trucks.findById(req.params.id)
        .then(truck => {
            if (truck) {
                req.truck = truck
                next()
            } else res.status(404).json({ message: 'could not find truck with that id' })
        })
        .catch(err => res.status(500).json({ message: 'failed to find truck' }))
}


function validateMenuItems (req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing menu body' })
    }

    req.body.foreach(item => {
        if (!item.itemName) {
            res.status(400).json({ message: 'Missing item name' })
        }

        if (!item.itemDescription) {
            res.status(400).json({ message: 'Missing item description' })
        }

        if (!item.itemPhotos) {
            res.status(400).json({ message: 'Missing item photos in menu' })
        }

        if (item.itemPrice !== undefined) {
            res.status(400).json({ message: 'Missing item price' })
        }

        if (!item.customerRatings) {
            res.status(400).json({ message: 'Missing customer ratings' })
        }
    })

    next();
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
