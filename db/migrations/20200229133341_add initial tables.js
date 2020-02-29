exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
    })
    .createTable("songs", tbl => {
      tbl.increments();
      tbl
        .string("spotify_id")
        .notNullable()
        .unique();
    })
    .createTable("user_songs", tbl => {
      tbl.primary(["user_id", "song_id"]);
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("song_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("songs")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("user_songs")
    .dropTableIfExists("songs")
    .dropTableIfExists("users");
};
