
exports.seed = function (knex) {
  return knex('menus').insert([
    { item_name: 'item1', item_description: 'test description1', item_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.matchingfoodandwine.com%2Fnews%2Ftravel%2Fwhat-makes-korean-food-distinctive%2F&psig=AOvVaw1Ouhb0GNELhlnuzbpwmB4t&ust=1596054293725000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiHvNzj8OoCFQAAAAAdAAAAABAJ', item_price: '7.50', truck_id: 1 },
    { item_name: 'item2', item_description: 'test description2', item_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thespruceeats.com%2Fbbq-party-planning-checklist-4165215&psig=AOvVaw2yeV6uDGrlUenuADFJ7mq7&ust=1596054271864000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOjNzdLj8OoCFQAAAAAdAAAAABAD', item_price: '6.50', truck_id: 2 },
    { item_name: 'item3', item_description: 'test description3', item_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.insider.com%2Fbest-and-worst-things-to-eat-at-an-italian-restaurant-2020-1&psig=AOvVaw1fJ6vAApkD1SHaF0oFMa6I&ust=1596054334025000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDr8e_j8OoCFQAAAAAdAAAAABAD', item_price: '8.50', truck_id: 3 },
    { item_name: 'item4', item_description: 'test description4', item_image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.matchingfoodandwine.com%2Fnews%2Ftravel%2Fwhat-makes-korean-food-distinctive%2F&psig=AOvVaw1Ouhb0GNELhlnuzbpwmB4t&ust=1596054293725000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiHvNzj8OoCFQAAAAAdAAAAABAJ', item_price: '4.50', truck_id: 1 },
  ], 'id');
};


