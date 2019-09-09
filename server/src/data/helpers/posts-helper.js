const db = require("../dbConfig");

module.exports = {
  addPost,
  getPosts,
  getUsersPosts,
  updatePost,
  deletePost
};

function getPosts(user_id) {
  return db
    .select(
      "posts.id as post_id",
      "posts.content",
      "posts.created_at",
      "users.id as user_id",
      "users.full_name",
      "users.profile_image_url"
    )
    .distinct()
    .from("posts")
    .join("follows", "posts.user_id", "follows.following_id")
    .join("users", "users.id", "posts.user_id")
    .where({ "posts.user_id": user_id })
    .orWhere({ "follows.user_id": user_id })
    .orderBy("posts.id", "desc");
}
function getUsersPosts(user_id) {
  return db("posts")
    .where({ "posts.user_id": user_id })
    .orderBy("posts.id", "desc");
}

function addPost(post) {
  return db("posts")
    .insert(post)
    .returning("id")
    .then(([id]) => findByPostID(id));
}

function findByPostID(id) {
  return db
    .select(
      "posts.id as post_id",
      "posts.content",
      "posts.created_at",
      "users.id as user_id",
      "users.full_name",
      "users.profile_image_url"
    )
    .from("posts")
    .join("users", "users.id", "posts.user_id")
    .where({ "posts.id": id })
    .first();
}

function updatePost(id, updatedPost) {
  return db("posts")
    .where({ id: id })
    .update(updatedPost)
    .then(() => findByPostID(id))
    .catch(error => {
      console.log(`ERROR: ${error}`);
    });
}

function deletePost(id) {
  return db("posts")
    .where({ id: id })
    .del();
}
