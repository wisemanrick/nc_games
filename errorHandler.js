
exports.rootNotFound = (request, response, next) => {
    //not error not requires as useing endpoint app.all in app.js
    response.status(404).send({msg : "404 not found"})
}


exports.psqlError = (error, request, response, next) => {
    console.log(error)
    if(error.code === '42703'){
        response.status(400).send({msg : "Bad Request"})
        console.log(error)
    }
    
}



