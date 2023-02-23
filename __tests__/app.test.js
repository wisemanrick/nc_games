const request = require("supertest")
const app = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const db = require("../db/connection")

//require("jest-sorted") - could not get this to work


beforeEach(() => {
    return seed(data);
});

afterAll(() => {
    db.end();
});

describe("GET /api/categories", () =>{
    test("Should have a length of 4 and 2 properties 'slug' and 'description'", () => {
        return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
            const { categories } = body
            expect(categories).toHaveLength(4)
            categories.forEach(category => {
                expect(category).toHaveProperty("slug", expect.any(String))
                expect(category).toHaveProperty("description", expect.any(String))
            })
        })
    }) 
    test("404 status and message '404 not found' when pass an incorrect URL", () =>{
        return request(app)
        .get("/api/categorie")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")
        })
    })
})
describe("GET /api/reviews", () =>{
    test("Should have a length of 4 and 2 properties 'slug' and 'description'", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
            const { reviews } = body
            expect(reviews).toHaveLength(13)
            
            reviews.forEach(category => {
                expect(category).toHaveProperty("comment_count", expect.any(String))
                expect(category).toHaveProperty("owner", expect.any(String))
                expect(category).toHaveProperty("title", expect.any(String))
                expect(category).toHaveProperty("review_id", expect.any(Number))
                expect(category).toHaveProperty("category", expect.any(String))
                expect(category).toHaveProperty("review_img_url", expect.any(String))
                expect(category).toHaveProperty("created_at", expect.any(String))
                expect(category).toHaveProperty("votes", expect.any(Number))
                expect(category).toHaveProperty("designer", expect.any(String))
            })
        })
    })
    test("Should return the array in desending order", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
            const { reviews } = body
            const constclonedReviews = [...reviews]
            const sortedByReview_id = constclonedReviews.sort((sortA, sortB) => {
                return sortB.created_at - sortA.created_at
            })                 
            expect(reviews[0].created_at).toBe(sortedByReview_id[0].created_at)
            expect(reviews[12].created_at).toBe(sortedByReview_id[12].created_at)
        })
    })           
    test("Should the correct comment counts for one of the reviews", () => {
        return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
            const { reviews } = body
            expect(reviews[7].comment_count).toBe("3")
        })
    }) 
    test("404 status and message '404 not found' when pass an incorrect URL", () =>{
        return request(app)
        .get("/api/review")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")
        })
    })
})
describe("GET /api/reviews:review_id", () =>{
    test("Should have a length of 1 and multiple properties", () => {
        return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then(({ body }) => {
            const { review } = body
                expect(review).toHaveLength(1)
                expect(review[0]).toHaveProperty("created_at", expect.any(String))
                expect(review[0]).toHaveProperty("owner", expect.any(String))
                expect(review[0]).toHaveProperty("title", expect.any(String))
                expect(review[0]).toHaveProperty("review_id", expect.any(Number))
                expect(review[0]).toHaveProperty("category", expect.any(String))
                expect(review[0]).toHaveProperty("review_img_url", expect.any(String))
                expect(review[0]).toHaveProperty("review_body", expect.any(String))
                expect(review[0]).toHaveProperty("votes", expect.any(Number))
                expect(review[0]).toHaveProperty("designer", expect.any(String))
            })
        })
 
    test("Query in correct format (Number) but no a id in the db", () => {
        return request(app)
        .get("/api/reviews/100")
        .expect(404)
        .then(({ body }) => {
            expect(body.msg).toBe("404 not found")   
        })
    })
    test("Query with wrong format (Not Number) ", () => {
        return request(app)
        .get("/api/reviews/ten")
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")         
        })
    
    })
    test("404 status and message '404 not found' when pass an incorrect URL", () =>{
        return request(app)
        .get("/api/review/1")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")
        })
    })
    
})
describe("/api/reviews/:review_id/comments", () =>{
    test("Should have a length of 3 and multiple properties", () => {
        return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
            const { comments } = body         
                expect(comments).toHaveLength(3)
                expect(comments[0].review_id).toBe(2)
                comments.forEach(comment => {
                expect(comment).toHaveProperty("created_at", expect.any(String))
                expect(comment).toHaveProperty("comment_id", expect.any(Number))
                expect(comment).toHaveProperty("votes", expect.any(Number))
                expect(comment).toHaveProperty("review_id", expect.any(Number))
                expect(comment).toHaveProperty("author", expect.any(String))
                expect(comment).toHaveProperty("body", expect.any(String))
                })
               
            })
        })
        test("comments should be served with the most recent comments first", () => {
            return request(app)
            .get("/api/reviews/2/comments")
            .expect(200)
            .then(({ body }) => {
                const { comments } = body
                const clonedComments = [...comments]
                const sortedByCreated_At = clonedComments.sort((sortA, sortB) => {
                    return sortB.created_at - sortA.created_at
                })               
                expect(comments[0].created_at).toBe(sortedByCreated_At[0].created_at)
                expect(comments[2].created_at).toBe(sortedByCreated_At[2].created_at)
            })
        })           
        test("Query in correct format (Number) but no a id in the db", () => {
            return request(app)
            .get("/api/reviews/200/comments")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe("404 not found")   
            })
        })
        test("Query with wrong format (Not Number) ", () => {
            return request(app)
            .get("/api/reviews/two/comments")
            .expect(400)
            .then(({body}) => {
                expect(body.msg).toBe("Bad Request")         
            })
        
        })
        test("404 status and message '404 not found' when pass an incorrect URL", () =>{
            return request(app)
            .get("/api/reviews/2/comment")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("404 not found")
            })
        })
        
})
describe("POST /api/reviews/:review_id/comments", () =>{
    test("when a new comment is posted, its added to the db and the new comment is returned from the db", () =>{

        const newComment = {username : "dav3rid", 
        body : "What a game changer !!!!!"}
        return request(app)
        .post("/api/reviews/1/comments")
        .send(newComment)
        .expect(201)
        .then(({body}) =>{
            expect(body.comment).toEqual({author : "dav3rid", 
                                        body : "What a game changer !!!!!", 
                                        comment_id : 7, 
                                        review_id : 1, 
                                        votes : 0,
                                        created_at : expect.any(String)})
        })
    })
    test("Query with wrong format (Not Number) ", () => {
        const newComment = {username : "dav3rid", 
        body : "What a game changer !!!!!"}
        return request(app)
        .post("/api/reviews/one/comments")
        .send(newComment)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request")         
        }) 
    })
    test("404 status and message '404 not found' when pass an incorrect URL", () =>{
        const newComment = {username : "dav3rid", 
        body : "What a game changer !!!!!"}
        return request(app)
        .post("/api/reviews/2/comment")
        .send(newComment)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")
        })
    }) 
    test("if passed a user not in the user table", () =>{
        const newComment = {username : "Rick", 
        body : "What a game changer !!!!!"}
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newComment)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")
        })
    })
   
    test("ignores unnessary properties", () =>{
        const newComment = {username : "dav3rid", 
        body : "What a game changer !!!!!",
        dog: "Rodger"}
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newComment)
        .expect(201)
        .then(({body})=>{
            
            expect(body.comment).toEqual({author : "dav3rid", 
            body : "What a game changer !!!!!", 
            comment_id : 7, 
            review_id : 2, 
            votes : 0,
            created_at : expect.any(String)})
        })
    })
    
    test("returns 404 if review_id is out of range", () =>{
        const newComment = {username : "dav3rid", 
        body : "What a game changer !!!!!",
        dog: "Rodger"}
        return request(app)
        .post("/api/reviews/9999999/comments")
        .send(newComment)
        .expect(404)
        .then(({body})=>{          
            expect(body.msg).toBe("404 not found")
        })
})

test("missing fields i.e. username", () =>{
    const newComment = { 
    body : "What a game changer !!!!!"}
        return request(app)
        .post("/api/reviews/2/comments")
        .send(newComment)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")
        })
    })
})
describe("PATCH /api/reviews/:review_id", () => {
    test("would increment the current review's vote property by 1", ()=>{
        const newVote = { inc_votes : 1 }
            return request(app)
            .patch("/api/reviews/2")
            .send(newVote)
            .expect(200)
            .then(({body})=>{
                const {review} = body               
                expect(review).toHaveProperty("created_at", expect.any(String))
                expect(review.owner).toBe("philippaclaire9")
                expect(review.title).toBe("Jenga")
                expect(review.review_id).toBe(2)
                expect(review.category).toBe("dexterity")
                expect(review.review_img_url).toBe("https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700")
                expect(review.review_body).toBe("Fiddly fun for all the family")
                expect(review.votes).toBe(6)
                expect(review.designer).toBe("Leslie Scott")

            })
})
test("Query with wrong format (Not Number) ", ()=>{
    const newVote = { inc_votes : 1 }
        return request(app)
        .patch("/api/reviews/two")
        .send(newVote)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")                
            
        })
    })
  
   test("404 status and message '404 not found' when pass an incorrect URL ", ()=>{
    const newVote = { inc_votes : 1 }
        return request(app)
        .patch("/api/review/2")
        .send(newVote)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")                
            
        })
    })
   
   test("if passed a user not in the user table", ()=>{
    const newVote = { inc_votes : 1 }
        return request(app)
        .patch("/api/review/222222")
        .send(newVote)
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("404 not found")                
            
        })
    })
   
   test("if passed additional properties, they would be ignored", ()=>{
    const newVote = { inc_votes : 1 , game : "jenga"}
        return request(app)
        .patch("/api/reviews/2")
        .send(newVote)
        .expect(200)
        .then(({body})=>{
            const {review} = body               
                expect(review).toHaveProperty("created_at", expect.any(String))
                expect(review.owner).toBe("philippaclaire9")
                expect(review.title).toBe("Jenga")
                expect(review.review_id).toBe(2)
                expect(review.category).toBe("dexterity")
                expect(review.review_img_url).toBe("https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700")
                expect(review.review_body).toBe("Fiddly fun for all the family")
                expect(review.votes).toBe(6)
                expect(review.designer).toBe("Leslie Scott")                
            
        })
    })
   test("missing fields i.e. inc_votes", ()=>{
    const newVote = { votes : 1 }
        return request(app)
        .patch("/api/reviews/2")
        .send(newVote)
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")                
            
})
})
   test("would decrease votes by 100", ()=>{
    const newVote = { inc_votes : -100 }
        return request(app)
        .patch("/api/reviews/2")
        .send(newVote)
        .expect(200)
        .then(({body})=>{
            const {review} = body               
            expect(review).toHaveProperty("created_at", expect.any(String))
            expect(review.owner).toBe("philippaclaire9")
            expect(review.title).toBe("Jenga")
            expect(review.review_id).toBe(2)
            expect(review.category).toBe("dexterity")
            expect(review.review_img_url).toBe("https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700")
            expect(review.review_body).toBe("Fiddly fun for all the family")
            expect(review.votes).toBe(-95)
            expect(review.designer).toBe("Leslie Scott")

        })
    })
})
describe.only("GET /api/users", () =>{
    test("returns all users", () => {
        return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
            const { users } = body
            expect(users).toHaveLength(4)
            users.forEach(user => {
                expect(user).toHaveProperty("username", expect.any(String))
                expect(user).toHaveProperty("name", expect.any(String))
                expect(user).toHaveProperty("avatar_url", expect.any(String))
            })
        })
    }) 
    //just this test 404 status and message '404 not found' when pass an incorrect URL
})







