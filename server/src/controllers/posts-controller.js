const Posts = require("../data/helpers/posts-helper");

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost
};

function addPost(req, res) {
  let newPost = { ...req.body, user_id: req.params.id };
  Posts.addPost(newPost)
    .then(newPost => {
      res.status(201).json(newPost);
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
}

function getPosts(req, res) {
  Posts.getPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json(error);
    });
}

function updatePost(req, res) {
  const requestedUpdate = req.body;
  Posts.updatePost(req.params.id, requestedUpdate)
    .then(updatedPost => {
      res.status(200).json(updatedPost);
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}

function deletePost(req, res) {
  Posts.deletePost(req.params.id)
    .then(() => {
      res.status(203).json({ message: "post successfully deleted" });
    })
    .catch(error => {
      console.log(`ERROR: ${error}`);
      res.status(500).json(error);
    });
}
