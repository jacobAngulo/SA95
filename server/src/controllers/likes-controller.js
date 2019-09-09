const Likes = require("../data/helpers/likes-helper");

module.exports = {
  getLikes,
  addLike,
  deleteLike
};

function getLikes(req, res) {
  Likes.getLikes(req.params.id)
    .then(likes => {
      res.status(200).json(likes);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function addLike(req, res) {
  Likes.addLike({
    user_id: req.body.user_id,
    post_id: req.params.id
  })
    .then(likes => {
      res.status(201).json(likes);
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json(error);
    });
}

function deleteLike(req, res) {
  Likes.deleteLike(req.params.id)
    .then(() => {
      res.status(202).json({ message: "like successfully deleted" });
    })
    .catch(error => {
      console.log("ERROR: ", error);
      res.status(500).json(error);
    });
}
