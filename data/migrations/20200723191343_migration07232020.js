
exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('username', 128)
            .notNullable()
            .unique();
        users.string('email', 128).notNullable();
        users.string('password', 128).notNullable();
        users.boolean('is_operator').notNullable();

    })

        .createTable('trucks', trucks => {
            trucks.increments();

            trucks.string('image').notNullable();
            trucks.string('cuisine_type', 128).notNullable();

            trucks.specificType('location', 'geometry(point, 4326)').notNullable();

            trucks.string('departure', 128);
            trucks.integer('operator_id').references('id').inTable('users').notNullable();
        })

        .createTable('truck_ratings', trs => {
            trs.increments();

            trs.integer('truck_id').references('id').inTable('trucks').notNullable();
            trs.integer('rating').notNullable();
        })

        .createTable('menus', menus => {
            menus.increments();

            menus.string('item_name', 128).notNullable();
            menus.text('item_description').notNullable();
            menus.string('item_image').notNullable();
            menus.integer('item_price').notNullable();

            menus.integer('truck_id').references('id').inTable('trucks').notNullable();
        })

        .createTable('menu_item_ratings', mi => {
            mi.increments();

            mi.integer('menu_id').references('id').inTable('menus').notNullable();
            mi.integer('rating').notNullable();
        })



};

exports.down = function (knex) {
    return knex.schema
        .dropTable('truck_ratings')
        .dropTable('menu_item_ratings')
        .dropTable('menus')
        .dropTable('trucks')
        .dropTable('users')
};
