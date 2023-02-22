const db = require("../db/connection")

exports.fetchCommentByReviewId = (review_id) => {
    
    return db
    .query(`SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`,[review_id]).then((result) => {
      
        const rowCount = result.rowCount
        if ( rowCount === 0) {
            return Promise.reject("id not found")
        } else {
            return result.rows
        }
    })
}