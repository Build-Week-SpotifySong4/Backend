const db = require("../db/db-model.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const songs = await db.getUserSongs(req.user.id);
    res.status(200).json({ songs });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
