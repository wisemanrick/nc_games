const db = require("../db/connection")
//Model

exports.fetchReviews = () => {

    return db
    .query(`SELECT * FROM reviews;`)
    .then((result) => {
        return result.rows
    })

}