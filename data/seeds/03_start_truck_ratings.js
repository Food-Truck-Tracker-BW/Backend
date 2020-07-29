
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('truck_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('truck_ratings').insert([
        { truck_id: 1, rating: 4 },
        { truck_id: 2, rating: 4 },
        { truck_id: 3, rating: 2 }
      ], 'id');
    });
};
