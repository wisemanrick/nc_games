const format = require("pg-format")
const db = require("../db/connection")

exports.checkExists = (table, colum, value) => {
    const queryStr = format('SELECT * FROM %I WHERE %I = $1', table,colum)

    return db.query(queryStr,[value])
    .then((result) => {

        if (result.rows.length === 0) {
            return Promise.reject("not found")
        } else {
            return {}
        }
    })
}