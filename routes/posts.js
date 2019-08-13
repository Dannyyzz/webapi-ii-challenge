const router = require('express').Router();

const db = require('../data/db.js');

router.post("/", async (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
        return;
    }

    try {
        const { id } = await db.insert({ title, contents });

        const [post] = await db.findById(id);

        if(!post) {
            res.send(404).json({
                errorMessage: "No post found with that ID"
            });
            return;
        }

        res.status(201).json({
            post: post
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            errorMessage: "There was an errr while saving the post in the database"
        })
    }
}) 

router.post("/:id/comments", async (req,res) => {
    const { id } = req.params;
    const { text } = req.body;

    try{
        const [post] = await db.findById(id);

        if(!post) {
            res.status(400).json({
                message: "Please provide text for the comment"
            })
            return;
        }

        if (!text) {
            res.status(400).json({
                errorMessage: "Please provide text for the comment"
            })
            return;
        }

        const { id: commentId } = await db.insertComment({
            post_id: id,
            text
        })

        const [comment] = await db.findCommentById(commentId);

        if(!comment) {
            res.status(404).json({
                message: "The comment with the specified ID does not exist."
            })
            return;
        }

        res.status(201).json({
            comment
        })
    } catch (error) {
        res.status(500).json({
            error: "There was an error while saving the comment to the database"
        })
    }
})

router.get("/", (_req, res) => {
    try {
        const posts = await db.find();

        res.status(200).json({
            posts
        })
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            error: "The posts information could not be retrieved."
        })
    }

    res.send("Hi");
})

router.get("/:id", async (req, res) => {
    const { id } = req.params:

    try {
        const [post] = await db.findById(id);

        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
            return;
        }

        res.status(200).json({
            post    
        })
    } catch {
        console.error(error.message);

        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    }
})

module.exports = router;