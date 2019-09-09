exports.seed = function(knex, Promise) {
  return knex("follows").insert([
    {
      user_id: 1,
      following_id: 2
    },
    {
      user_id: 2,
      following_id: 1
    },
    {
      user_id: 1,
      following_id: 3
    }
  ]);
};
