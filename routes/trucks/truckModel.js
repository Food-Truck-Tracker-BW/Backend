const db = require('../../data/dbConfig.js');
const knexPostgis = require('knex-postgis');
const st = knexPostgis(db);

module.exports = {
    add,
    find,
    findBy,
    findById,
    findMenus,
    findLocation,
    addMenu,
    updateTruck,
    removeTruck,
    findWithinRad,
    findByCuisine,
    getAvgRatings,
    getItemAvgRatings,
    getItem
};

function find () {
    return db('trucks');
}

function findBy (filter) {
    return db('trucks').where(filter);
}

async function add (user) {
    const [id] = await db('trucks').insert(user, 'id');

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

async function addMenuItem (item) {
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

function findWithinRad (lat, lng, rad) {
    return db("trucks")
        .select(
            st.distance("location", st.geography(st.makePoint(lng, lat))).as("distanceAway")
        )
        .where(st.dwithin("location", st.geography(st.makePoint(lng, lat)), rad));
    //rad = meters
}

function findByCuisine (cuisine_type) {
    return db('trucks').where({ cuisine_type })
}

async function getAvgRatings (id) {
    const ratings = db('truck_ratings')
        .where('truck_id', id)
    return ratings.reduce((a, b) => (a + b)) / ratings.length;
}

function getItem (id) {
    return db('menus')
        .where({ id })
        .first()
}

async function getItemAvgRatings (id) {
    const ratings = await db('menu_item_ratings')
        .where('menu_id', id)
    return ratings.reduce((a, b) => (a + b)) / ratings.length;
}