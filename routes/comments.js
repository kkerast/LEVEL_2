const express = require("express");
const comments_router = express.Router({ mergeParams: true });
const Comment = require("../schemas/comment");

// POST /posts/:id/comments : 댓글 작성 API
comments_router.post("/", async (req, res, next) => {
  //console.log("req : ", req.params);
  const { _postId } = req.params;
  //console.log("_postId : ", _postId);
  try {
    const { user, password, content } = req.body;
    const newComment = {
      user,
      password,
      content,
      postId: _postId,
    };
    if (!content) {
      throw new Error("댓글 내용을 입력해주세요");
    } else if (!user || !password) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }

    await Comment.create(newComment)
      .then((post) => {
        //console.log("New comment saved successfully!");
        console.log(post);
        res.send({ message: "댓글을 생성하였습니다." });
      })
      .catch((error) => {
        console.error(error);
        throw new Error("데이터 형식이 올바르지 않습니다.");
      });
  } catch (error) {
    error.status = 400;
    return next(error);
  }

  //res.send({ message: "댓글을 생성하였습니다." });
});

// GET /posts/:id/comments : 댓글 목록 조회 API
comments_router.get("/", async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    const { _postId } = req.params;
    console.log("_postId : ", _postId);

    const comments = await Comment.find({ postId: _postId }, { __v: 0 }).sort({
      createdAt: -1,
    });
    // const list = JSON.stringify(comments);
    console.log(comments);

    res.json({ data: comments });
    //res.send("댓글 목록 조회 API");
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

// PUT /posts/:id/comments/:commentId : 댓글 수정 API
comments_router.put("/:commentId", async (req, res, next) => {
  //console.log("req : ", req.params);
  try {
    const { _postId, commentId } = req.params;
    console.log("_postId : ", _postId);
    console.log("commentId : ", commentId);

    console.log(req.body);

    const { password, content } = req.body;

    console.log(password, content);
    if (!_postId || !commentId) {
      const error = new Error("데이터 형식이 올바르지 않습니다.");
      error.status = 400;
      throw error;
    }
    if (!content) {
      const error = new Error("댓글 내용을 입력해주세요");
      error.status = 400;
      throw error;
    }
    // Post.updateOne({ _id: id, password: password }, { title, content })
    const comments = await Comment.updateOne(
      { _id: commentId },
      { content: content }
    );

    // const list = JSON.stringify(posts);
    console.log("update : ", comments.modifiedCount);

    // res.json({ data: posts });

    if (comments.modifiedCount) {
      res.send("댓글을 수정하였습니다.");
    } else {
      const error = new Error("댓글 조회에 실패하였습니다.");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    //error.status = 400;
    return next(error);
  }
});

// DELETE /posts/:id/comments/:commentId : 댓글 삭제 API
comments_router.delete("/:commentId", async (req, res, next) => {
  //console.log("req : ", req.params);
  try {
    const { _postId, commentId } = req.params;
    console.log("_postId : ", _postId);
    console.log("commentId : ", commentId);
    if (!_postId || !commentId) {
      const error = new Error("데이터 형식이 올바르지 않습니다.");
      error.status = 400;
      throw error;
    }
    const comments = await Comment.findByIdAndDelete(commentId);
    // const list = JSON.stringify(posts);
    console.log("delete : ", comments);

    //res.send("게시글 삭제 API");
    if (comments) {
      res.send("댓글을 삭제하였습니다.");
    } else {
      const error = new Error("댓글 조회에 실패하였습니다.");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    //error.status = 400;
    return next(error);
  }
});

module.exports = comments_router;
