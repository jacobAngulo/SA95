exports.seed = function(knex, Promise) {
  return knex("posts").insert([
    {
      user_id: 1,
      content: "this is a test post",
      created_at: 1561951780757
    },
    {
      user_id: 2,
      content: "this another test post",
      created_at: 1561951788757
    },
    {
      user_id: 2,
      content: "this is another another test post",
      created_at: 1561931780757
    },
    {
      user_id: 3,
      content: "this is another another another test post",
      created_at: 1561951760757
    }
  ]);
};
