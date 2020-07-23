const router = require('express').Router();

const Trucks = require('./dinerModel.js');
const restricted = require('../auth/restricted.js');

//gets
router.get('/', (req, res) => {
    Trucks.find()
        .then(trucks => {
            res.json({ trucks: trucks });
        })
        .catch(err => res.send(err));
});

router.get('/:id', validateId, (req, res) => {
    res.json({ truck: req.truck });
});

router.get('/:id/menus', validateId, (req, res) => {
    Trucks.findMenus(req.params.id)
        .then(menus => {
            res.json({ menus: menus });
        })
        .catch(err => res.send(err));
});

router.get('/:id/location', validateId, (req, res) => {
    Trucks.findLocation(req.params.id)
        .then(menus => {
            res.json({ location: location });
        })
        .catch(err => res.send(err));
});

//post 
router.post('/:id/addMenuItem', restricted.restrictedOperator, validateId, validateMenuItems, (req, res) => {
    Trucks.addMenu(req.body, req.params.id)
        .then(menu => {
            res.json({ menu: menu })
        })
        .catch(err => res.send(err))
});

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


module.exports = router;
