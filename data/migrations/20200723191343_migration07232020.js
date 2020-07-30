
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
        users.string('token').notNullable();
    })

        .createTable('trucks', trucks => {
            trucks.increments();

            trucks.string('name').notNullable().unique();
            trucks.string('image').notNullable();
            trucks.string('cuisine_type', 128).notNullable();

            trucks.specificType('location', 'geometry(point, 4326)').notNullable();

            trucks.string('departure', 128);

            trucks.integer('operator_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

        })

        .createTable('truck_ratings', trs => {
            trs.increments();

            trs.integer('truck_id')
                .notNullable()
                .references('id')
                .inTable('trucks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            trs.integer('rating').notNullable();
        })

        .createTable('menus', menus => {
            menus.increments();

            menus.string('item_name', 128).notNullable();
            menus.text('item_description').notNullable();
            menus.string('item_image').notNullable();
            menus.string('item_price').notNullable();

            menus.integer('truck_id')
                .notNullable()
                .references('id')
                .inTable('trucks')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })

        .createTable('menu_item_ratings', mi => {
            mi.increments();

            mi.integer('menu_id')
                .notNullable()
                .references('id')
                .inTable('menus')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');

            mi.integer('rating').notNullable();
        })



};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('truck_ratings')
        .dropTableIfExists('menu_item_ratings')
        .dropTableIfExists('menus')
        .dropTableIfExists('trucks')
        .dropTableIfExists('users')
};
