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

  return await findBy({ id });
}

function remove(table, id) {
  return db(table)
    .where({ id })
    .delete();
}

module.exports = { find, findBy, insert, remove };
