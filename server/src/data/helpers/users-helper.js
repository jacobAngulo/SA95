require("dotenv").config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const db = require("../dbConfig");

function addUser(user) {
  return db("users")
    .insert(user)
    .returning("id")
    .then(([id]) => findByID(id));
}

function findByFuzzySearch(string) {
  return db("users").where("full_name", "like", `%${string}%`);
}

function findByEmail(email) {
  const user = db("users")
    .where({ email: email })
    .first();

  return user;
}

async function getSubjectData(userID, subjectID) {
  const userData = await db
    .select(
      "users.id",
      "users.profile_image_url",
      "users.bio",
      "users.full_name",
      "users.profile_banner_image_url"
    )
    .from("users")
    .where("users.id", subjectID);

  const isFollowing = await db("follows")
    .where("user_id", userID)
    .andWhere("following_id", subjectID);

  const followers = await db
    .select("users.full_name", "users.profile_image_url", "users.id")
    .from("users")
    .join("follows", "follows.user_id", "users.id")
    .where("follows.following_id", subjectID)
    .distinct();

  const following = await db
    .select("users.full_name", "users.profile_image_url", "users.id")
    .from("users")
    .join("follows", "follows.following_id", "users.id")
    .where("follows.user_id", subjectID)
    .distinct();

  return {
    ...userData["0"],
    isFollowing: Boolean(isFollowing.length),
    followers: followers,
    following: following
  };
  // return db
  //   .select("users.profile_image_url", "users.bio", "users.full_name")
  //   .from("users")
  //   .where("users.id", userID)
  //   .union([
  //     db
  //       .select("follows.following_id")
  //       .from("follows")
  //       .where("follows.user_id", userID)
  //       .andWhere("follows.following_id", subjectID)
  //   ]);
}

function findByID(id) {
  const user = db("users")
    .where({ id: id })
    .first();

  return user;
}

function updateUser(id, updatedUser) {
  return db("users")
    .where({ id: id })
    .update(updatedUser)
    .then(() => {
      return findByID(id);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      return error;
    });
}

// const s3 = new aws.S3({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: "us-east-1"
// });

// const profileImageUpload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET,
//     acl: "public-read",
//     metadata: function(req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function(req, file, cb) {
//       cb(null, Date.now().toString());
//     }
//   })
// });

module.exports = {
  addUser,
  findByFuzzySearch,
  findByEmail,
  findByID,
  getSubjectData,
  updateUser,
//   profileImageUpload
};
