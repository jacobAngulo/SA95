exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", likes => {
    likes.increments();

    likes
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    likes
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("likes");
};
