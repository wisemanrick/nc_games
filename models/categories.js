const db = require("../db/connection")
//model
exports.fetchCategories = () => {
    return db
    .query(`SELECT * FROM categories;`)
    .then((result) => {
        return result.rows
    })
}