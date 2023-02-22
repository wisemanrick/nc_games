const { fetchCommentByReviewId } = require("../models/Comments")



exports.getCommentByReviewId = (request, response, next) => {
    const {review_id} = request.params

    fetchCommentByReviewId(review_id).then((comments) => {
       
        response.status(200).send({comments})
    })
    .catch((error) => {
        
        next(error)
    })

} 