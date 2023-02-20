const request = require("supertest")
const app = require("../app")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const db = require("../db")
const { expect } = require("@jest/globals")

afterEach(() => {
    return db.end();
  });

beforeEach(() => {
    return seed(data);
  });

describe("GET /api/categories", () =>{
    test("SHould have a length of 4 and 2 properties 'slug' and 'description'", () => {
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
    
}) // Describe GET /api/categories