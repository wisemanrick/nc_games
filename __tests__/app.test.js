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

