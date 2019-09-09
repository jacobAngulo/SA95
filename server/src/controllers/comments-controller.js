const Comments = require("../data/helpers/comments-helper");

module.exports = {
  addComment,
  getComments,
  updateComment,
  deleteComment
};

function addComment(req, res) {
  Comments.addComment({
    user_id: req.params.id,
    ...req.body
  })
    .then(newComment => {
      res.status(201).json(newComment);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function getComments(req, res) {
  Comments.getComments(req.params.id)
    .then(comments => {
      res.status(200).json(comments);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function updateComment(req, res) {
  const requestedUpdate = req.body;
  Comments.updateComment(req.params.id, requestedUpdate)
    .then(updatedComment => {
      res.status(200).json(updatedComment);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function deleteComment(req, res) {
  Comments.deleteComment(req.params.id)
    .then(() => {
      res.status(203).json({ message: "comment successfully deleted" });
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}
