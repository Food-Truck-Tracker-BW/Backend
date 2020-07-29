
exports.seed = function (knex) {
  return knex('menu_item_ratings').insert([
    { menu_id: 1, rating: 4 },
    { menu_id: 2, rating: 2 },
    { menu_id: 3, rating: 3 },
    { menu_id: 4, rating: 4 },
  ], 'id');
};
