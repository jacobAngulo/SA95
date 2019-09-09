const db = require("../dbConfig");

module.exports = {
  addFollow,
  deleteFollow
};

function addFollow(userID, subjectID) {
  return db("follows")
    .insert({
      user_id: userID,
      following_id: subjectID
    })
    .returning("id")
    .then(([id]) => {
      return db("follows").where({
        id: id
      });
    });
}

function deleteFollow(id) {
  return db("follows")
    .where({ id: id })
    .del();
}
