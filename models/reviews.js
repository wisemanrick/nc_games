const db = require("../db/connection")
//Model

exports.fetchReviews = () => {

    return db
    .query(`SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY created_at DESC;`)
    .then((result) => {

        return result.rows
    })
}

exports.fetchReviewById = (review_id) => {
    
    return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`,[review_id]).then((result) => {
        
        const rowCount = result.rowCount
        if ( rowCount === 0) {
            return Promise.reject("id not found")
        } else {
            return result.rows
        }
    })
}

exports.updateReviewVote = (vote, review_id) => {
    const {inc_votes} = vote
    

    return db
    .query(`UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,[inc_votes, review_id]).then(({rows}) => {
        
        return rows[0]
    })
}





