const Follows = require("../data/helpers/follows-helper");

const addFollow = (req, res) => {
  const { userID, subjectID } = req.body;
  Follows.addFollow(userID, subjectID)
    .then(newFollow => {
      res.status(201).json(newFollow);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
};

const deleteFollow = (req, res) => {
  const { id } = req.params;
  Follows.deleteFollow(id)
    .then(() => {
      res.status(203).json({ message: "follow successfully removed from db" });
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
};

module.exports = {
  addFollow,
  deleteFollow
};
