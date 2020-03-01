exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("user_songs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("user_songs").insert([
        { user_id: 1, song_id: 1 },
        { user_id: 2, song_id: 2 },
        { user_id: 3, song_id: 3 },
        { user_id: 4, song_id: 4 },
        { user_id: 5, song_id: 5 },
        { user_id: 6, song_id: 6 },
        { user_id: 7, song_id: 7 },
        { user_id: 8, song_id: 7 },
        { user_id: 9, song_id: 8 },
        { user_id: 10, song_id: 8 }
      ]);
    });
};
