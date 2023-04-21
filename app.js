const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app
  .get("/api/posts", (req, res) => {
    // GET /api/posts : 전체 게시글 목록 조회 API
    res.send("Hello, Express");
  })
  .post("/api/posts", (req, res) => {
    // POST /api/posts : 게시글 작성 API
    res.send("Hello, Express");
  });

app.get("/api/posts/:id", (req, res) => {
  // GET /api/posts/:id : 게시글 조회 API
  res.send("Hello, Express");
});

app.put("/api/posts/:id", (req, res) => {
  // PUT /api/posts/:id : 게시글 수정 API
  res.send("Hello, Express");
});

app.delete("/api/posts/:id", (req, res) => {
  // DELETE /api/posts/:id : 게시글 삭제 API
  res.send("Hello, Express");
});

app.get("/api/posts/:id", (req, res) => {
  // GET /api/posts/:id/comments : 댓글 목록 조회 API
  res.send("Hello, Express");
});

app.post("/api/posts/:id/comments", (req, res) => {
  // POST /api/posts/:id/comments : 댓글 작성 API
  res.send("Hello, Express");
});

app.put("/api/posts/:id/comments/:commentId", (req, res) => {
  // PUT /api/posts/:id/comments/:commentId : 댓글 수정 API
  res.send("Hello, Express");
});

app.delete("/api/posts/:id/comments/:commentId", (req, res) => {
  // DELETE /api/posts/:id/comments/:commentId : 댓글 삭제 API
  res.send("Hello, Express");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
