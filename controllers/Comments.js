const { fetchCommentByReviewId, insertCommetByRewiewId } = require("../models/Comments")

exports.getCommentByReviewId = (request, response, next) => {
    const {review_id} = request.params

    fetchCommentByReviewId(review_id).then((comments) => {
       
        response.status(200).send({comments})
    })
    .catch((error) => {
        
        next(error)
    })

} 

exports.postCommentByReviewId = (request, response, next) => {
    const {review_id} = request.params
    const {body} = request
    
    if(!body.hasOwnProperty("username") || !body.hasOwnProperty("body") ){
        next(error = "Missing key")
    }
    
    insertCommetByRewiewId(request.body, review_id).then((comment) => {
        
        response.status(201).send({comment})
    })
    .catch((error) => {
        
        next(error)
    })
}