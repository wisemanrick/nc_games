
exports.rootNotFound = (request, response, next) => {
        
    response.status(404).send({msg : "404 not found"})
}


exports.psqlError = (error, request, response, next) => {
   
    if (error === "not found" || error.code === "23503"){
        response.status(404).send({msg :"404 not found"})
    } 
    else if ( error.code === "22P02" ) {
        
        response.status(400).send({msg :"Bad Request"})
        
    } else if (error === "Missing key" || error === "incorect query") {

        response.status(400).send({msg :"Bad Request"})
    }
}



