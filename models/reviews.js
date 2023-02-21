const db = require("../db/connection")
//Model

exports.fetchReviews = () => {

    return db
    .query(`SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY reviews.review_id;`)
    .then((result) => {
        console.log(result.rows)
        return result.rows
    })

 

}