const bcrypt = require("bcryptjs");
const dummyPW = bcrypt.hashSync("123abc", 10);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Jordan", password: dummyPW },
        { username: "Chris", password: dummyPW },
        { username: "Alex", password: dummyPW },
        { username: "Benjamin", password: dummyPW },
        { username: "Brian", password: dummyPW },
        { username: "Baisali", password: dummyPW },
        { username: "Jan", password: dummyPW },
        { username: "Keanu", password: dummyPW },
        { username: "Seth", password: dummyPW },
        { username: "Tanner", password: dummyPW }
      ]);
    });
};
