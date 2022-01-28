const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        post_date: {type: Date, required: true, default: Date.now()},
        post_data: {type: String, required: true},
    }
);

exports.Post = model("Post", postSchema);