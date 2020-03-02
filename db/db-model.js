const db = require("./connections.js");

function find(table) {
  return db(table);
}

function findBy(table, filter) {
  return db(table)
    .where(filter)
    .first();
}

async function insert(table, data, returnFields) {
  const [id] = await db(table)
    .returning(returnFields)
    .insert(data);

  return await findBy(table, { id });
}

function remove(table, filter) {
  return db(table)
    .where(filter)
    .delete();
}

function getUserSongs(id) {
  return db("users as u")
    .select("s.spotify_id", "us.song_id")
    .join("user_songs as us", { "u.id": "us.user_id" })
    .join("songs as s", { "s.id": "us.song_id" })
    .where({ "u.id": id });
}

function saveSong(data) {
  return db("user_songs")
    .returning("song_id")
    .insert(data);
}

function closeConnection() {
  return db.destroy();
}

module.exports = {
  find,
  findBy,
  insert,
  remove,
  getUserSongs,
  saveSong,
  closeConnection
};
