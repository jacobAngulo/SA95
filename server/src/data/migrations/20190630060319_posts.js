exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts", posts => {
    posts.increments();

    posts
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    posts
      .integer("created_at")
      .unsigned()
      .notNullable();

    posts.string("content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("posts");
};
