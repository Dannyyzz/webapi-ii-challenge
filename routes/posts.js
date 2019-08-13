const router = require('express').Router();

const db = require('../data/db.js');

router.post("/", async (req, res) => {
    const { title, contents } = req.body;

    if(!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
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

router.get("/", (req, res) => {
    res.send("Hi");
})

module.exports = router;