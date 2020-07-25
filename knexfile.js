const localPg = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  database: 'foodTruckTracker',
};

const pgUser = process.env.PG_USER || 'postgres';
const pgDb = process.env.PG_DB || 'testdb';
const testDb = 'ftt-test';

const prodConnection = `postgres://${pgUser}:pjwise@localhost/${pgDb}`;
const testConnection = `postgres://${pgUser}:pjwise@localhost/${testDb}`;

module.exports = {

  development: {
    client: 'pg',
    connection: prodConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  testing: {
    client: 'pg',
    connection: testConnection,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/testSeeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

};