const Users = require("../data/helpers/users-helper");

module.exports = {
  updateUserProfilePicture,
  getUserByID,
  getSubjectData,
  fuzzySearch
};

function fuzzySearch(req, res) {
  const { string } = req.body;

  console.log(req.body);

  Users.findByFuzzySearch(string)
    .then(results => {
      console.log(results);
      res.status(200).json({
        results: results,
        searched_string: string
      });
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function getUserByID(req, res) {
  Users.findByID(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function getSubjectData(req, res) {
  const { userID, subjectID } = req.body;
  console.log(req.body);
  Users.getSubjectData(userID, subjectID)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function updateUserProfilePicture(req, res) {
  Users.profileImageUpload.single("image")(req, res, error => {
    const profileImageUrl = req.file.location;
    Users.findByID(req.params.id)
      .then(user => {
        const updatedUser = { ...user, profile_image_url: profileImageUrl };
        Users.updateUser(req.params.id, updatedUser)
          .then(userWithUpdatedProfileImageUrl => {
            res.status(202).json(userWithUpdatedProfileImageUrl);
          })
          .catch(error => {
            console.log(`ERROR: ${error}`);
            res.status(500).json(error);
          });
      })
      .catch(error => {
        console.log(`ERROR: ${error}`);
        res.status(500).json(error);
      });
  });
}
