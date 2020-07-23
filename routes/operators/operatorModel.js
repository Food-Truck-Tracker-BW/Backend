const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    addTruck,
};

function find () {
    return db('operators').select('id', 'username', 'password');
}

function findBy (filter) {
    return db('operators').where(filter);
}

async function add (user) {
    const [id] = await db('operators').insert(user);

    return findById(id);
}

function findById (id) {
    return db('operators')
        .where({ id })
        .first();
}