const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    findMenus,
    findLocation,
    addMenu,
    updateTruck,
    removeTruck
};

function find () {
    return db('trucks').select('id', 'username', 'password');
}

function findBy (filter) {
    return db('trucks').where(filter);
}

async function add (user) {
    const [id] = await db('trucks').insert(user);

    return findById(id);
}

function findById (id) {
    return db('trucks')
        .where({ id })
        .first();
}

function findMenus (id) {
    return db('menus').where({ truck_id: id })
}

function addMenuItem (item) {
    const [id] = await db('menus').insert(item, 'id')
    // return findMenus(truckId);
}

function addMenu (items, truckId) {
    items.forEach(item => {
        addMenuItem(item)
    });

    return findMenus(truckId);
}

function findLocation (id) {
    return db('currentLocation').where({ truck_id: id })
}

function updateTruck (id, updatedTruck) {
    return db('trucks').where({ id })
        .update(updatedTruck)
        .then(() => {
            return findById(id)
        })
}

async function removeTruck (id) {
    let truck = await findById(id)
    return db('trucks').where({ id })
        .del()
        .then(res => {
            if (res) {
                return truck
            } else return null;
        })
}

