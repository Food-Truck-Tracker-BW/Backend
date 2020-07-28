
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('truck_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('truck_ratings').insert([
        { id: 1, truck_id: 1, rating: 4 },
        { id: 2, truck_id: 2, rating: 4 },
        { id: 3, truck_id: 3, rating: 2 }
      ]);
    });
};
