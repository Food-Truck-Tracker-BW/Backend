const knex = require('knex');
const knexPostgis = require('knex-postgis');

const db = knex({
  client: 'postgres'
});

// install postgis functions that are in knex.postgis;
const st = knexPostgis(db);

exports.seed = function (knex) {
  return knex('trucks').insert([
    { name: 'Test Truck Korean', image: 'https://media-cdn.tripadvisor.com/media/photo-s/0b/3d/45/72/food-truck.jpg', cuisine_type: 'Korean', location: st.geomFromText('POINT(25.789679 -80.189089)', 4326), departure: '03:25:00', operator_id: '1' },
    { name: 'Test Truck BBQ', image: 'https://i.pinimg.com/originals/1b/62/0a/1b620a5ec9f96080b5ec1d9932932508.jpg', cuisine_type: 'BBQ', location: st.geomFromText('POINT(28.545716 -81.376835)', 4326), departure: '07:45:00', operator_id: '2' },
    { name: 'Test Truck Italian', image: 'https://russosgourmet.com/wp-content/uploads/ft1.jpg', cuisine_type: 'Italian', location: st.geomFromText('POINT(41.884423 -87.623971)', 4326), departure: '06:05:00', operator_id: '3' }
  ], 'id');
};
