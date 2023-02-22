const {getCategories} = require("./controllers/categories")
const express = require("express")
const { rootNotFound, psqlError, error500Status} = require("./errorHandler")
const { getReviews, getReviewById} = require("./controllers/reviews")

// End of requires

const app = express()

// Endpoints

app.get("/api/categories", getCategories )
app.get("/api/reviews", getReviews)
app.get("/api/reviews/:review_id", getReviewById)





// put all endpoints above
app.all("/*", rootNotFound)

//Error handleing
app.use(psqlError)



module.exports = app