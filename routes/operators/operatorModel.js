const db = require('../../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    addTruck,
    findTrucksById,
    removeOperator,
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

function findTrucksById (id) {
    return db('trucks')
        .where({ id })
        .first();
}

function addTruck (truck) {
    const [id] = await db('trucks').insert(truck, 'id');
    return findTrucksById(id);
}

async function removeOperator (id) {
    let operator = await findById(id)
    return db('operators').where({ id })
        .del()
        .then(res => {
            if (res) {
                return operator
            } else return null;
        })
}