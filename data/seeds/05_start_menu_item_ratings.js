
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('menu_item_ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('menu_item_ratings').insert([
        { id: 1, menu_id: 1, rating: 4 },
        { id: 2, menu_id: 2, rating: 2 },
        { id: 3, menu_id: 3, rating: 3 },
        { id: 4, menu_id: 4, rating: 4 },
      ]);
    });
};
