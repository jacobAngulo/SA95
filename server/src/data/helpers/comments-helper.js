const db = require("../dbConfig");

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment
};

function getComments(post_id) {
  return db
    .select(
      "comments.id as comment_id",
      "comments.created_at",
      "comments.content",
      "users.id as user_id",
      "users.full_name",
      "users.profile_image_url"
    )
    .from("comments")
    .where({ post_id: post_id })
    .join("users", "users.id", "comments.user_id");
}

function addComment(comment) {
  return db("comments")
    .insert(comment)
    .returning("id")
    .then(([id]) => findByID(id));
}

function findByID(id) {
  return db("comments")
    .select(
      "comments.id as comment_id",
      "comments.created_at",
      "comments.content",
      "users.id as user_id",
      "users.full_name",
      "users.profile_image_url"
    )
    .from("comments")
    .join("users", "users.id", "comments.user_id")
    .where({ "comments.id": id })
    .first();
}

function updateComment(id, updatedComment) {
  return db("comments")
    .where({ id: id })
    .update(updatedComment)
    .then(() => findByID(id))
    .catch(error => {
      console.log(`ERROR: ${error}`);
    });
}

function deleteComment(id) {
  return db("comments")
    .where({ id: id })
    .del();
}
