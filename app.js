const {getCategories} = require("./controllers/categories")
const express = require("express")



const app = express()

app.get("/api/categories", getCategories )

module.exports = app