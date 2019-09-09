exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", comments => {
    comments.increments();

    comments
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    comments
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");

    comments
      .integer("created_at")
      .unsigned()
      .notNullable();

    comments.string("content").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("comments");
};
