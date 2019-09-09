exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("email", 60)
      .notNullable()
      .unique();

    users.string("password").notNullable();

    users.string("full_name", 60);

    users.string("profile_banner_image_url");

    users.string("profile_image_url");

    users.string("bio");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
