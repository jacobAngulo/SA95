exports.seed = function(knex, Promise) {
  return knex("comments").insert([
    {
      user_id: 1,
      post_id: 1,
      created_at: 1961951780756,
      content: "this is a test comment"
    },
    {
      user_id: 2,
      post_id: 1,
      content: "this another test comment",
      created_at: 1968951780756
    },
    {
      user_id: 2,
      post_id: 2,
      content: "this is another another test comment",
      created_at: 1961951780716
    },
    {
      user_id: 3,
      post_id: 3,
      content: "this is another another another test comment",
      created_at: 1961951780356
    }
  ]);
};
