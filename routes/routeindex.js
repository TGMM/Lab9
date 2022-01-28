// const { render } = require("ejs");
const moment = require("moment");
const express = require("express");
const router = express.Router();

const { Post } = require("../models/post");

router.get("/", async function (_req, res) {
    const posts = await Post.find();
    res.render("index", { posts, moment });
});

router.get("/newPost", async (_req, res) => {
    res.render("newPost");
});

router.post("/newPost", async (req, res) => {
    try {
        console.log("New post request");
        const newPost = new Post(req.body);
        await newPost.save();

        if (req.accepts("html")) res.redirect("/");
        else res.sendStatus(201);
    } catch (error) {
        res.sendStatus(400);
    }
});

router.get("/edit/:id", async (req, res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render("edit", { post });
});

router.post("/edit/:id", async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, req.body).exec();

        if (req.accepts("html")) res.redirect("/");
        else res.sendStatus(204);
    } catch (error) {
        res.sendStatus(400);
    }
});

router.get("/delete/:id", async (req, res) => {
    const post = await Post.findById(req.params.id).exec();
    res.render("delete", { post });
});

router.post("/delete/:id", async (req, res) => {
    try {
        await Post.findByIdAndRemove(req.params.id).exec();

        if (req.accepts("html")) res.redirect("/");
        else res.sendStatus(204);
    } catch (error) {
        res.sendStatus(400);
    }
});

module.exports = router;
