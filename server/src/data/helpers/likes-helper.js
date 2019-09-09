const db = require("../dbConfig");

module.exports = {
  getLikes,
  addLike,
  deleteLike
};

function getLikes(post_id) {
  return db
    .select(
      "likes.id as like_id",
      "likes.user_id",
      "likes.post_id",
      "users.email"
    )
    .from("likes")
    .where({ post_id: post_id })
    .join("users", "users.id", "likes.user_id");
}

function addLike(like) {
  return db("likes")
    .insert(like)
    .then(() => {
      return getLikes(like.post_id);
    })
    .catch(error => {
      return error;
    });
}

function deleteLike(id) {
  return db("likes")
    .where({ id: id })
    .del();
}
