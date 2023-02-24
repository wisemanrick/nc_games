const db = require("../db/connection")
const { checkExists } = require("../utils/appUtils")

//Model

exports.fetchReviews = (category, sort_by, order) => {

    const orderByAllowed = ["ASC", "DESC"]
    const sortByAllowed = ["review_id", "title", "category", "designer","review_body", "votes", "review_img_url", "created_at" ]
    if(sort_by && !sortByAllowed.includes(sort_by)) {
        return Promise.reject("incorect query")
    }
    if(order && !orderByAllowed.includes(order)) {
        return Promise.reject("incorect query")
    }

    let queryStr = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY created_at DESC;`
    const querySelection = []
    if (category) {
        querySelection.push(category)
        queryStr = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id WHERE category = $1 GROUP BY comments.review_id,reviews.review_id ORDER BY created_at DESC;`
    } else if (sort_by) {
        queryStr = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY ${sort_by} DESC;`
    } else if (order) {
        
        queryStr = `SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews LEFT JOIN comments ON reviews.review_id = comments.review_id GROUP BY comments.review_id,reviews.review_id ORDER BY created_at ${order};`
    }

    return db
    .query(queryStr,querySelection)
    .then((result) => {

        if (result.rowCount === 0){
            return checkExists("categories","slug",category)
        } else {
            return result.rows
        }

        

        // const rowCount = result.rowCount
        // if ( rowCount === 0) {
        //     return Promise.reject("not found")
        // } else {
        //     return result.rows
        // }
    })
}

exports.fetchReviewById = (review_id) => {
    
    return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`,[review_id]).then((result) => {
        
        const rowCount = result.rowCount
        if ( rowCount === 0) {
            return Promise.reject("not found")
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





