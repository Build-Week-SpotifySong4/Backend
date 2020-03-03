const dbModel = require("../db/db-model.js");
const db = require("../db/connections");
const { generateToken, getSpotifyAuth } = require("../tokenUtils.js");
const server = require("../api/server");
const request = require("supertest");

const testuser = {
  username: "booobbbb",
  password: "pass2"
};

afterAll(done => {
  // manually close db connection after tests to resolve "improper teardown" warning
  dbModel.closeConnection();
  done();
});

describe("First Test", function() {
  describe("test enivronment", function() {
    it("should use the testing environment", function() {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });

  /////////****  REGISTER TEST  ************///////// */

  describe("registerUser", function() {
    beforeEach(async () => {
      await db("users").delete();
    });
    it("adds the new user to the db", async function() {
      await dbModel.insert("users", testuser, "id");
      const users = await db("users");
      // test the specific user inserted - prevents failing test if other tests have inserted other users
      expect(users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ username: "booobbbb" })
        ])
      );
    });
  });
});

//********************************************************************* */

describe("Testing api/auth/register", () => {
  it("responds with 201", async () => {
    const resp = await request(server)
      .post("/api/auth/register")
      .send({
        username: "Christopher",
        password: "pass2"
      });
    expect(resp.status).toEqual(201);
  });
});

describe("Testing api/auth/login", () => {
  it("responds with 201", async () => {
    const resp = await request(server)
      .post("/api/auth/register")
      .send({
        username: "Jacob",
        password: "pass2"
      });
    expect(resp.status).toEqual(201);
  });
});
