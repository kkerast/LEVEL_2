const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    nickname: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
    },
  }
  // { timestamps: true, _id: false }
);
postsSchema.virtual("postId").get(function () {
  return this._id.toHexString(); // 이 부분의 this._id에 해당하는 부분을 가상화 시킨다.
});
//postsSchema.set("toJSON", { virtuals: true });

postsSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // postId를 임시 변수에 저장하고 삭제
    const postId = ret.postId;
    delete ret._id;
    delete ret.id;
    delete ret.postId;

    // 원하는 순서대로 객체를 생성
    const ordered = {
      postId: postId,
      userId: ret.userId,
      nickname: ret.nickname,
      title: ret.title,
      content: ret.content,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
    return ordered;
  },
});

module.exports = mongoose.model("Posts", postsSchema);
