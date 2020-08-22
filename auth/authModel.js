const db = require('../data/dbConfig')

module.exports = {
    findById,
    register,
    findByUsername,
}

function findById(id) {
    return db('users')
    .where({ id }).first()
    .select("username", "phonenumber").first()
}

function register(userInfo) {
    return db('users').insert(userInfo)
        .then(ids => {
            return findById(ids[0])
        })
}

function findByUsername(username) {
    return db('users').where({ username }).first()
}