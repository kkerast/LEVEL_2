const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/post");

post_router.get("/posts", async (req, res) => {
  // GET /posts : 전체 게시글 목록 조회 API
  const posts = await Posts.find({});
  const list = JSON.stringify(posts);
  res.json({ posts: list });
  //res.send("전체 게시글 목록 조회 API");
});

post_router.get("/posts/:id", (req, res) => {
  // GET /posts/:id : 게시글 조회 API
  const { postId } = req.params;
  const [detail] = Posts.filter((posts) => posts.postId === Number(posts));
  res.json({ detail });
  res.send("게시글 조회 API");
});

post_router.put("/posts/:id", (req, res) => {
  // PUT /posts/:id : 게시글 수정 API
  post_router.send("게시글 수정 API");
});

post_router.delete("/posts/:id", (req, res) => {
  // DELETE /posts/:id : 게시글 삭제 API
  res.send("게시글 삭제 API");
});

module.exports = post_router;
