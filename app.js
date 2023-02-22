const {getCategories} = require("./controllers/categories")
const express = require("express")
const { rootNotFound, psqlError, error500Status} = require("./errorHandler")
const { getReviews, getReviewById} = require("./controllers/reviews")
const { getCommentByReviewId } = require("./controllers/Comments")


// End of requires

const app = express()

// Endpoints

app.get("/api/categories", getCategories )
app.get("/api/reviews", getReviews)
app.get("/api/reviews/:review_id", getReviewById)
app.get("/api/reviews/:review_id/comments", getCommentByReviewId )





// put all endpoints above
app.all("/*", rootNotFound)

//Error handleing
app.use(psqlError)



module.exports = app