const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("test123", 14);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { email: "test1@gmail.com", username: 'testUser1', password: hash, is_operator: true },
        { email: "test2@yahoo.com", username: 'testUser2', password: hash, is_operator: false },
        { email: "test3@icloud.com", username: 'testUser3', password: hash, is_operator: true }
      ], 'id');
    });
};