
exports.up = function (knex) {
    return knex.schema.createTable('diners', diners => {
        diners.increments();

        diners
            .string('username', 128)
            .notNullable()
            .unique();
        diners.string('password', 128).notNullable()
        diners.boolean('is_operator').notNullable().defaultTo(false);

    })

        .createTable('operators', operators => {
            operators.increments();

            operators
                .string('username', 128)
                .notNullable()
                .unique();
            operators.string('password', 128).notNullable()
            operators.boolean('is_operator').notNullable().defaultTo(true);

        })



};

exports.down = function (knex) {
    return knex.schema.dropTable('diners');
};
