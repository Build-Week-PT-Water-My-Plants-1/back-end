const db = require('../data/dbConfig')

module.exports = {
    findUserById,
    findPlantsByUserId,
    findById,
    add,
    update,
    remove
}

function findUserById(id) {
    return db('users').where({ id })
}

function findById(id){
    return db('plants').where({ id })
}

function findPlantsByUserId(userId) {
    return db('plants').where({ user_id: userId})
}

function add(plantInfo) {
    return db('plants').insert(plantInfo)
        .then( ids => {
            return findById(ids[0])
        })
}

function update(newInfo, id) {
    return db('plants').where({ id }).update(newInfo)
        .then( ids => {
            return findById(id)
        })
}

function remove(id){
    return db('plants').where({ id }).del()
}