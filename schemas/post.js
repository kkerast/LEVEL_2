const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  postId: {
    type: Number,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  createAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Posts", postsSchema);
