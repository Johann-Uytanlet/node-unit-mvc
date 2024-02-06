const PostModel = require('../models/post.model');
const PostController = {};

PostController.create = (req, res) => {
    return PostModel.createPost(req.body, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    })

};

PostController.update = (req, res) => {
    const postId = req._id;
    const updatedData = req.body;

    return PostModel.updatePost(postId, updatedData, (err, post) => {
        if (err) {
            return res.status(500).end();
        } else {
            return res.json(post);
        }
    });
};

PostController.findPost = (req, res) => {
    const postId = req._id;
    PostModel.findPost(postId, (err, post) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.json(post);
    });
};


PostController.getAllPosts = (req, res) => {

};

module.exports = PostController;