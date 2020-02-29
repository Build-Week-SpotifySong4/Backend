const db = require("./connections.js");

function find(table) {
  return db(table);
}

function findBy(table, filter) {
  return db(table)
    .where(filter)
    .first();
}

async function insert(table, data) {
  const [id] = await db(table)
    .returning("id")
    .insert(data);

  return await findBy("users", { id });
}

function remove(table, id) {
  return db(table)
    .where({ id })
    .delete();
}

function getUserSongs(id) {
  return db("users as u")
    .select("s.spotify_id")
    .join("user_songs as us", { "u.id": "us.user_id" })
    .join("songs as s", { "s.id": "us.song_id" })
    .where({ "u.id": id });
}

module.exports = { find, findBy, insert, remove, getUserSongs };
