exports.seed = function(knex, Promise) {
  return knex("likes").insert([
    {
      user_id: 1,
      post_id: 1
    },
    {
      user_id: 2,
      post_id: 1
    },
    {
      user_id: 2,
      post_id: 2
    },
    {
      user_id: 3,
      post_id: 2
    },
    {
      user_id: 1,
      post_id: 4
    },
    {
      user_id: 2,
      post_id: 4
    },
    {
      user_id: 1,
      post_id: 3
    },
    {
      user_id: 4,
      post_id: 2
    }
  ]);
};
