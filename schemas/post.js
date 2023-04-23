const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      default: "temp",
    },
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    createAt: {
      type: Date,
      default: Date.now,
      unique: true,
    },
  }
  //{ timestamps: true, _id: false }
);

module.exports = mongoose.model("Posts", postsSchema);
