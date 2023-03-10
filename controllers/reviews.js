const { fetchReviews, fetchReviewById, updateReviewVote } = require("../models/reviews")

exports.getReviews = (request, response, next) => {
    const {category, sort_by, order } = request.query
    
    fetchReviews(category, sort_by, order).then((reviews) => {
        response.status(200).send({ reviews })
    })
    .catch((error) => {
        
        next(error)
    })
} 

exports.getReviewById = (request, response, next) => {
    const {review_id} = request.params
    
    fetchReviewById(review_id).then((review) => {
        response.status(200).send({review})
    })
    .catch((error) => {
        
        next(error)
    })
}

exports.patchVoteByReviewId = (request, response, next) =>{
    const {review_id} = request.params
    const {body} = request
    if(!body.hasOwnProperty("inc_votes")){
        next(error = "Missing key")
    }
    updateReviewVote(body,review_id).then((review) => {
        response.status(200).send({review})
    })
    .catch((error) => {
        
        next(error)
    })
}
