const knex = require('knex');
const knexPostgis = require('knex-postgis');

const db = knex({
  client: 'postgres'
});

// install postgis functions in knex.postgis;
const st = knexPostgis(db);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        { id: 1, name: 'Test Truck Korean', image: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.koreaherald.com%2Fview.php%3Fud%3D20160219000572&psig=AOvVaw3SIlaYtPs_-JUlTz75UUDJ&ust=1596000763233000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPj8saec7-oCFQAAAAAdAAAAABAD', cuisine_type: 'Korean', location: st.geomFromText('POINT(25.789679 -80.189089)', 4326), departure: '03:25:00', operator_id: '1' },
        { id: 2, name: 'Test Truck BBQ', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdonmurraysbbq2go.com%2Fbbq-food-truck%2F&psig=AOvVaw2UkmcEVtMmlfeP0e9RZJ6N&ust=1596000740198000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMju35uc7-oCFQAAAAAdAAAAABAD', cuisine_type: 'BBQ', location: st.geomFromText('POINT(28.545716 -81.376835)', 4326), departure: '07:45:00', operator_id: '2' },
        { id: 3, name: 'Test Truck Italian', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Frussosgourmet.com%2Frussos-trucktoria%2F&psig=AOvVaw1LdfSOWg-E0_aPPnexiY9R&ust=1596000782298000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiCx6-c7-oCFQAAAAAdAAAAABAD', cuisine_type: 'Italian', location: st.geomFromText('POINT(41.884423 -87.623971)', 4326), departure: '06:05:00', operator_id: '3' }
      ]);
    });
};
