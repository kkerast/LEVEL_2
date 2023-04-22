const express = require("express");
const comments_router = express.Router();

const connect = require("../schemas/comments.js");
connect();

comments_router.get("/api/posts/:id", (req, res) => {
  // GET /api/posts/:id/comments : 댓글 목록 조회 API
  res.send("댓글 목록 조회 API");
});

comments_router.post("/api/posts/:id/comments", (req, res) => {
  // POST /api/posts/:id/comments : 댓글 작성 API
  res.send("댓글 작성 API");
});

comments_router.put("/api/posts/:id/comments/:commentId", (req, res) => {
  // PUT /api/posts/:id/comments/:commentId : 댓글 수정 API
  res.send("댓글 수정 API");
});

comments_router.delete("/api/posts/:id/comments/:commentId", (req, res) => {
  // DELETE /api/posts/:id/comments/:commentId : 댓글 삭제 API
  res.send("댓글 삭제 API");
});

module.exports = comments_router;
