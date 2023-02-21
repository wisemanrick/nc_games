const request = require("supertest")
const app = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const db = require("../db/connection")
// end of requires line 6

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
    }) //End of 1st test
 
    test("404 status and message '404 not found' when pass an incorrect URL", () =>{
        return request(app)
        .get("/api/categorie")
        .expect(404)
        .then(({body})=>{
            console.log(body)
            expect(body.msg).toBe("404 not found")
        })
    }) //end of 2nd test
  

}) // Describe GET /api/categories























































describe.skip("GET /api/reviews:review_id", () =>{
    test.skip("Should have a length of 2 and 2 properties multiple properties", () => {
        return request(app)
        .get("/api/reviews:1")
        .expect(200)
        .then(({ body }) => {
            const { reviews } = body
            expect(reviews).toHaveLength(1)
                expect(category).toHaveProperty("created_at", expect.any(String))
                expect(category).toHaveProperty("owner", expect.any(String))
                expect(category).toHaveProperty("title", expect.any(String))
                expect(category).toHaveProperty("review_id", expect.any(Number))
                expect(category).toHaveProperty("category", expect.any(String))
                expect(category).toHaveProperty("review_img_url", expect.any(String))
                expect(category).toHaveProperty("review_body", expect.any(String))
                expect(category).toHaveProperty("votes", expect.any(Number))
                expect(category).toHaveProperty("designer", expect.any(String))
            })
        })
    })
    test.skip("Query in correct format (Number) but no a id in the db", () => {
        return request(app)
        .get("/api/reviews:100")
        .expect(404)
        .then(({ body }) => {
            const { reviews } = body
            expect(reviews).toHaveLength(1)
                expect(category).toHaveProperty("created_at", expect.any(String))
                expect(category).toHaveProperty("owner", expect.any(String))
                expect(category).toHaveProperty("title", expect.any(String))
                expect(category).toHaveProperty("review_id", expect.any(Number))
                expect(category).toHaveProperty("category", expect.any(String))
                expect(category).toHaveProperty("review_img_url", expect.any(String))
                expect(category).toHaveProperty("review_body", expect.any(String))
                expect(category).toHaveProperty("votes", expect.any(Number))
                expect(category).toHaveProperty("designer", expect.any(String))
            })
        })







