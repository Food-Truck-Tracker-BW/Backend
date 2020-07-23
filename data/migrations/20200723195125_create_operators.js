
exports.up = function (knex) {
    return knex.schema.createTable('operators', operators => {
        operators.increments();

        operators
            .string('username', 128)
            .notNullable()
            .unique();
        operators.string('password', 128).notNullable()
        operators.boolean('is_operator').notNullable().defaultTo(true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('operators');
};
