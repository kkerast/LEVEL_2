const express = require("express");
const comments_router = express.Router();
const Comment = require("../schemas/post");

// POST /api/posts/:id/comments : 댓글 작성 API
comments_router.post("/api/posts/:id/comments", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  const { user, password, content } = req.body;
  const newComment = {
    user,
    password,
    content,
  };

  await Comment.create(newComment)
    .then((post) => {
      console.log("New comment saved successfully!");
      console.log(post);
    })
    .catch((error) => {
      console.error(error);
    });
  res.send({ message: "댓글을 생성하였습니다." });
});

// GET /api/posts/:id/comments : 댓글 목록 조회 API
comments_router.get("/api/posts/:id/comments", (req, res) => {
  res.send("댓글 목록 조회 API");
});

// PUT /api/posts/:id/comments/:commentId : 댓글 수정 API
comments_router.put("/api/posts/:id/comments/:commentId", (req, res) => {
  res.send("댓글 수정 API");
});

// DELETE /api/posts/:id/comments/:commentId : 댓글 삭제 API
comments_router.delete("/api/posts/:id/comments/:commentId", (req, res) => {
  res.send("댓글 삭제 API");
});

module.exports = comments_router;
