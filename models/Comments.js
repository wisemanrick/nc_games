const db = require("../db/connection")

exports.fetchCommentByReviewId = (review_id) => {
    
    return db
    .query(`SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC;`,[review_id]).then((result) => {
      
        const rowCount = result.rowCount
        if ( rowCount === 0) {
            return Promise.reject("not found")
        } else {
            return result.rows
        }
    })
}

exports.insertCommetByRewiewId = (comment, review_id) =>{
    const {username, body} = comment
    
   

    return db
    .query(
        `INSERT INTO comments (review_id, author, body) 
        VALUES ($1, $2, $3) RETURNING *;`, [review_id, username, body]
    )
    .then(({rows}) => {
        
        return rows[0]
    })
}