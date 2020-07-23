const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    removeDiner,
};

function find () {
    return db('diners').select('id', 'username', 'password');
}

function findBy (filter) {
    return db('diners').where(filter);
}

async function add (user) {
    const [id] = await db('diners').insert(user);

    return findById(id);
}

function findById (id) {
    return db('diners')
        .where({ id })
        .first();
}

async function removeDiner (id) {
    let diner = await findById(id)
    return db('diners').where({ id })
        .del()
        .then(res => {
            if (res) {
                return diner
            } else return null;
        })
}

// function addFavorites (id) {
//     return db('diners')
//         .where({ id })
//         .first();
// }

// - `username`: String
// - `password`: String
// - `currentLocation`: GPS coordinates or physical address
// - `favoriteTrucks`: Array of the `diner`'s favorite trucks
// - `currentLocation`: GPS coordinates or physical address
// - `favoriteTrucks`: Array of the `diner`s favorite trucks

