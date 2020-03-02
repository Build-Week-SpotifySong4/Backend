const db = require("../db/db-model.js");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const songs = await db.getUserSongs(req.user.id);
    res.status(200).json({ songs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.remove("user_songs", { song_id: id, user_id: req.user.id });
    res.status(200).json({ message: "Successfully deleted song" });
  } catch (error) {}
});

router.post("/", async (req, res) => {
  const { spotify_id } = req.body;
  try {
    if (spotify_id) {
      // check if it's already in songs table
      const songExists = await db.findBy("songs", { spotify_id });
      let newSongID;

      if (songExists) {
        newSongID = songExists.id;
      } else {
        // insert into songs
        newSongID = await db.insert("songs", { spotify_id }, "id");
        newSongID = newSongID.id;
      }

      // insert into user songs
      const [newSavedSong] = await db.saveSong({
        song_id: newSongID,
        user_id: req.user.id
      });

      res.status(201).json({
        message: "Successfully saved song to your favorites",
        savedSong: newSavedSong
      });
    } else {
      res.status(400).json({ error: "invalid input" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
