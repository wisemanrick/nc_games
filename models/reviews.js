const db = require("../db/connection")
//Model

exports.fetchReviews = () => {

    return db
    .query(`SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY created_at DESC;`)
    .then((result) => {
        return result.rows
    })
}

