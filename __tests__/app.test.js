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