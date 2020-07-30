const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync("test123", 14);

exports.seed = function (knex) {
  return knex('users').insert([
    { email: "test1@gmail.com", username: 'testUser1', password: hash, is_operator: true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBqd2lzZTE3IiwiaXNfb3BlcmF0b3IiOnRydWUsImlhdCI6MTU5NTk4MjkxNywiZXhwIjoxNTk2MDY5MzE3fQ.WALEUtnr7q6_3BCzCbnBx01HfPyJweoE-zfcker3Sxw' },
    { email: "test2@yahoo.com", username: 'testUser2', password: hash, is_operator: false, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBqd2lzZTE3IiwiaXNfb3BlcmF0b3IiOnRydWUsImlhdCI6MTU5NTk4MjkxNywiZXhwIjoxNTk2MDY5MzE3fQ.WALEUtnr7q6_3BCzCbnBx01HfPyJweoE-zfcker3Sxw" },
    { email: "test3@icloud.com", username: 'testUser3', password: hash, is_operator: true, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBqd2lzZTE3IiwiaXNfb3BlcmF0b3IiOnRydWUsImlhdCI6MTU5NTk4MjkxNywiZXhwIjoxNTk2MDY5MzE3fQ.WALEUtnr7q6_3BCzCbnBx01HfPyJweoE-zfcker3Sxw" }
  ], 'id');
};