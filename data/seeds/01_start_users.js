const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("test123", 14);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, email: "test1@gmail.com", username: 'testUser1', password: hash, is_operator: true },
        { id: 2, email: "test2@yahoo.com", username: 'testUser2', password: hash, is_operator: false },
        { id: 3, email: "test3@icloud.com", username: 'testUser3', password: hash, is_operator: true }
      ]);
    });
};
