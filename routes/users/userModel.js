const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    addTruck,
    findTrucksById,
    removeUser,
    findDinerOrOperators
};

function find () {
    return db('users').select('id', 'username', 'password');
}

function findBy (filter) {
    return db('users').where(filter);
}

function findDinerOrOperators (is_operator) {
    return db('users').where({ is_operator })
}

async function add (user) {
    const [id] = await db('users').insert(user, 'id')

    return findById(id);
}

function findById (id) {
    return db('users')
        .where({ id })
        .first();
}

function findTrucksById (id) {
    return db('trucks')
        .where('operator_id', id)
}

async function addTruck (truck, operatorId) {
    const [id] = await db('trucks').insert(truck, 'id');
    return findTrucksById(operatorId);
}

async function removeUser (id) {
    let user = await findById(id)
    return db('users').where({ id })
        .del()
        .then(res => {
            if (res) {
                return user
            } else return null;
        })
}