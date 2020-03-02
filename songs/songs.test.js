require("dotenv").config();

const request = require("supertest");
const bcrypt = require("bcryptjs");
const server = require("../api/server.js");
const db = require("../db/db-model.js");
const { generateToken } = require("../tokenUtils.js");

let token;
const seedpass = "abcd1234";
const seed = {
  username: "homer",
  password: bcrypt.hashSync(seedpass, 12)
};

beforeEach(async () => {
  await db.remove("users", { username: "homer" });
  await db.insert("users", seed, "id");
  const user = await db.findBy("users", { username: "homer" });
  await db.saveSong({ song_id: 3, user_id: user.id });
  token = generateToken(user);
});

describe("songs router - ALL", () => {
  it("should return a 401 for unauthenticated users", async () => {
    const res = await request(server).get("/api/songs");

    expect(res.status).toBe(401);
  });
});

describe("songs router - GET", () => {
  it("should return a 200 for authenticated users", async () => {
    const res = await request(server)
      .get("/api/songs")
      .set("Authorization", token);

    expect(res.status).toBe(200);
  });

  it("should return an array of song objects", async () => {
    const res = await request(server)
      .get("/api/songs")
      .set("Authorization", token);

    expect(res.body.songs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          song_id: 3,
          spotify_id: "21Phj46KeUHOWyZW9A9b7P"
        })
      ])
    );
  });
});

describe("songs router - POST", () => {
  it("should add a song to the database", async () => {
    const res = await request(server)
      .post("/api/songs")
      .set("Authorization", token)
      .send({ spotify_id: "09opLVMX7cfKVKlP3iKZR1" });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        message: "Successfully saved song to your favorites"
      })
    );
  });

  it("should reject invalid input", async () => {
    const res = await request(server)
      .post("/api/songs")
      .set("Authorization", token)
      .send({ donkey: "kong" });

    expect(res.status).toBe(400);
  });
});
