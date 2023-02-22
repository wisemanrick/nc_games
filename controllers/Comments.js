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
    insertCommetByRewiewId(request.body, review_id).then((comment) => {
        response.send(201).send({comment})
    })
    .catch((error) => {
        
        next(error)
    })
}