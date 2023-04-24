const express = require("express");
const comments_router = express.Router({ mergeParams: true });
const Comment = require("../schemas/comment");

// POST /posts/:id/comments : 댓글 작성 API
comments_router.post("/", async (req, res) => {
  //console.log("req : ", req.params);
  const { _postId } = req.params;
  //console.log("_postId : ", _postId);

  const { user, password, content } = req.body;
  const newComment = {
    user,
    password,
    content,
    postId: _postId,
  };

  await Comment.create(newComment)
    .then((post) => {
      //console.log("New comment saved successfully!");
      console.log(post);
    })
    .catch((error) => {
      console.error(error);
    });
  res.send({ message: "댓글을 생성하였습니다." });
});

// GET /posts/:id/comments : 댓글 목록 조회 API
comments_router.get("/", async (req, res) => {
  console.log("req : ", req.params);
  const { _postId } = req.params;
  console.log("_postId : ", _postId);

  const comments = await Comment.find({ postId: _postId }, { __v: 0 });
  // const list = JSON.stringify(comments);
  console.log(comments);

  res.json({ data: comments });
  //res.send("댓글 목록 조회 API");
});

// PUT /posts/:id/comments/:commentId : 댓글 수정 API
comments_router.put("/:commentId", async (req, res) => {
  //console.log("req : ", req.params);
  const { _postId, commentId } = req.params;
  console.log("_postId : ", _postId);
  console.log("commentId : ", commentId);

  console.log(req.body);

  const { password, content } = req.body;
  console.log(password, content);

  // Post.updateOne({ _id: id, password: password }, { title, content })
  const comments = await Comment.updateOne(
    { _id: commentId },
    { content: content }
  );

  // const list = JSON.stringify(posts);
  console.log(comments);

  // res.json({ data: posts });

  res.send("댓글 수정 API");
});

// DELETE /posts/:id/comments/:commentId : 댓글 삭제 API
comments_router.delete("/:commentId", async (req, res) => {
  //console.log("req : ", req.params);
  const { _postId, commentId } = req.params;
  console.log("_postId : ", _postId);
  console.log("commentId : ", commentId);

  const comments = await Comment.findByIdAndDelete(commentId);
  // const list = JSON.stringify(posts);
  console.log(comments);

  //res.send("게시글 삭제 API");
  res.send("댓글 삭제 API");
});

module.exports = comments_router;
