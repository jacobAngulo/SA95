const db = require("../dbConfig");

module.exports = {
  addFollow,
  deleteFollow
};

async function addFollow(userID, subjectID) {
  const newFollower = await db("users")
    .where({ id: userID })
    .first();

  const newFollow = await db("follows")
    .insert({
      user_id: userID,
      following_id: subjectID
    })
    .returning("id")
    .then(([id]) => {
      return db("follows")
        .where({
          id: id
        })
        .first();
    });

  return {
    newFollow,
    newFollower
  };
}

function deleteFollow(id) {
  return db("follows")
    .where({ id: id })
    .del();
}
