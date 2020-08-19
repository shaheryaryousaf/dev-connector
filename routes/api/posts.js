const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
} = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route   POST api/posts
// desc     Add Post
// @access  Private 
router.post("/", [auth, [
    check("text", "Text is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            errors: errors.array()
        })
    }

    try {

        const user = await User.findById(req.user.id).select("-password");

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }

});


// @route   GET api/posts
// desc     Get All Posts
// @access  Private 
router.get("/", auth, async (req, res) => {
    try {

        const posts = await Post.find().sort({
            date: -1
        });
        res.json(posts);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


// @route   GET api/posts/:id
// desc     Get Single Post
// @access  Private 
router.get("/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if posts exists
        if (!post) {
            res.status(404).json({
                msg: "Post not found"
            });
        }
        res.json(post);

    } catch (error) {
        console.log(error.message);
        if (error.kind === "ObjectId") {
            res.status(404).json({
                msg: "Post not found"
            });
        }
        res.status(500).send("Server Error");
    }
});


// @route   Delete api/posts/:id
// desc     Delete Single Post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if posts exists
        if (!post) {
            res.status(404).json({
                msg: "Post not found"
            });
        }

        // Check user authorization
        if (post.user.toString() !== req.user.id) {
            res.status(401).json({
                msg: "User is not authorized"
            });
        }

        await post.remove();
        res.json({
            msg: "Post is removed"
        });

    } catch (error) {
        console.log(error.message);
        if (error.kind === "ObjectId") {
            res.status(404).json({
                msg: "Post not found"
            });
        }
        res.status(500).send("Server Error");
    }
})


// @route   PUT api/posts/like/:id
// desc     Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(404).json({
                msg: "Post is already been liked"
            })
        }

        post.likes.unshift({
            user: req.user.id
        });

        await post.save();
        res.json(post.likes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})


// @route   PUT api/posts/unlike/:id
// desc     Like a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Check if post is not liked yet
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(404).json({
                msg: "Post is not liked yet"
            })
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})


// @route   POST api/posts/comment/:id
// desc     Add a New Comment
// @access  Private 
router.post("/comment/:id", [auth, [
    check("text", "Text is required").not().isEmpty()
]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            errors: errors.array()
        })
    }

    try {

        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }

});



// @route   DELETE api/posts/comment/:id
// desc     Delete a Comment
// @access  Private 
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        // Get All Comments of a Post
        const comments = post.comments.find(comment => comment.id === req.params.comment_id);

        // Check if comments not exist
        if (!comments) {
            return res.status(404).json({
                msg: "Comment not found"
            })
        }

        // Check commene User Authorizarion
        if (comments.user.toString() !== req.user.id) {
            return res.status(401).json({
                msg: "User is not authorized"
            })
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();

        res.json(post.comments)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;