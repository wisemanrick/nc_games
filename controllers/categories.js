const {fetchCategories} = require("../models/categories")

exports.getCategories = (request, response, next) => {

    fetchCategories().then((categories) => {
        response.status(200).send({ categories })
    })

}