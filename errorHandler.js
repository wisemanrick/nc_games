
exports.rootNotFound = (request, response, next) => {
        
    response.status(404).send({msg : "404 not found"})
}


exports.psqlError = (error, request, response, next) => {
   
    if (error === "id not found"){
        response.status(404).send({msg :"404 not found"})
    } 
    else if ( error.code === "22P02" || error.code === "23503") {
        
        response.status(400).send({msg :"Bad Request"})
    }
}



