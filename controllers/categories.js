

exports.getCategories = (request, response, next) => {

    fetchCategories().then(retrunedCategories) => {
        response.status(200).send()
    }

}