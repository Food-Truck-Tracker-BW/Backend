
exports.up = function (knex) {
    return knex.schema.createTable('diners', diners => {
        diners.increments();

        diners
            .string('username', 128)
            .notNullable()
            .unique();
        users.string('password', 128).notNullable()
        users.boolean(false);
    });
};

exports.down = function (knex) {

};
