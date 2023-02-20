const {getCategories} = require("./controllers/categories")
const express = require("express")
const { rootNotFound, psqlError, error500Status} = require("./errorHandler")

// End of requires

const app = express()

// Endpoints

app.get("/api/categories", getCategories )


// put all endpoints above
app.all("/*", rootNotFound)

//Rrror handleing
app.use(psqlError)



module.exports = app