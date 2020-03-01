exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("songs").insert([
        { spotify_id: "1EiR6pce8KgrYGmPGU5xjY" },
        { spotify_id: "2lwwrWVKdf3LR9lbbhnr6R" },
        { spotify_id: "21Phj46KeUHOWyZW9A9b7P" },
        { spotify_id: "60Pe9j2pCBa4Zp4ztf5nhd" },
        { spotify_id: "7f1zjZG77S891Uv4O68yfk" },
        { spotify_id: "2FvD20Z8aoWIePi7PoN8sG" },
        { spotify_id: "4iiWcajF1fEUpwcUewc464" },
        { spotify_id: "4q650OiSDQIwccxDFpuuBm" }
      ]);
    });
};
