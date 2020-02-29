const db = require("../db/db-model.js");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const data = req.body;
  const hash = bcrypt.hashSync(data.password, 12);
  data.password = hash;

  try {
    const user = await db.insert("users", data, "id");
    const token = generateToken(user);
    res.status(201).json({ message: `Welcome, ${user.username}!`, token });
  } catch (error) {
    res.status(500).json({ error: "error registering new user" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.findBy("users", { username });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token, userid: user.id });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "there was an error logging in" });
  }
});

function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
