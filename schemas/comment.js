const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
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
commentSchema.virtual("commentId").get(function () {
  return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
});
commentSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Comment", commentSchema);
