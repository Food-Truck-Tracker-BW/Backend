const cleaner = require('knex-cleaner');

exports.seed = function (knex) {
    return cleaner.clean(knex, {
        ignoreTables: ['spatial_ref_sys', 'knex_migrations', 'knex_migrations_lock'], // don't empty migration tables
    });
};