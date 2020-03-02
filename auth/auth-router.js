const db = require("../db/db-model.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { generateToken, getSpotifyAuth } = require("../tokenUtils.js");


router.post("/register", async (req, res) => {
  console.log(req.body)
  const data = req.body;
  const hash = bcrypt.hashSync(data.password, 12);
  data.password = hash;

  try {
    const user = await db.insert("users", data, "id");
    const token = generateToken(user);
    const spotifyToken = await getSpotifyAuth();
    res
      .status(201)
      .json({ message: `Welcome, ${user.username}!`, token, spotifyToken });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "error registering new user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy("users", { username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      const spotifyToken = await getSpotifyAuth();
      res.status(200).json({ token, spotifyToken, userid: user.id });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "there was an error logging in" });
  }
});

module.exports = router;
