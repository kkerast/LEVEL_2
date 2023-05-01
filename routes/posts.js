const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/post");
const middleWare = require("../middlewares/auth-middleware");

// GET /posts : 게시글 조회 API
post_router.get("/", async (req, res, next) => {
  let posts = await Posts.find({}, { password: 0, content: 0, __v: 0 }).sort({
    createdAt: -1,
  });
  //const list = JSON.stringify(posts);

  res.json({ posts: posts });
  //res.send("게시글 조회 API");
});

// post /posts : 게시글 생성 API
post_router.post("/", middleWare, async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { nickname, id } = res.locals.user;
    if (!title || !content) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
    await Posts.create({
      userId: id,
      nickname: nickname,
      title: title,
      content: content,
    });
    res.status(201).json({ message: "게시글을 생성하였습니다." });
  } catch (error) {
    error.status = 400;
    return next(error);
  }

  // res.json({ message: "게시글을 생성하였습니다." });
  // res.send({ message: "게시글을 생성하였습니다." });
});

// GET /posts/:id : 게시글 상세조회 API
post_router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const posts = await Posts.findOne({ _id: id }, { __v: 0 });
    if (posts === null) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
    res.json({ post: posts });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

// PUT /posts/:id : 게시글 수정 API
post_router.put("/:id", middleWare, async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    const { id } = req.params;
    console.log("_id : ", id);

    console.log(req.body);

    const { title, content } = req.body;
    //const { nickname, id } = res.locals.user;
    const userId = res.locals.user.id;
    console.log(title, content);

    // Post.updateOne({ _id: id, password: password }, { title, content })
    const posts = await Posts.updateOne(
      { _id: id, userId: userId },
      { title: title, content: content, updatedAt: Date.now() }
    );

    // const list = JSON.stringify(posts);
    console.log(posts);
    if (!title || !content) {
      const error = new Error("데이터 형식이 올바르지 않습니다.");
      error.status = 400;
      throw error;
    }
    // res.json({ data: posts });
    if (posts.modifiedCount) {
      res.send("댓글을 수정하였습니다.");
    } else {
      const error = new Error("댓글 조회에 실패하였습니다.");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    // error.status = 400;
    return next(error);
  }
});

// DELETE /posts/:id : 게시글 삭제 API
post_router.delete("/:id", middleWare, async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    console.log("body : ", req.body);
    const { id } = req.params;
    //const { password } = req.body;
    const userId = res.locals.user.id;

    console.log("_id : ", id);
    //console.log("password : ", password);

    const posts = await Posts.deleteOne({ _id: id, userId: userId });
    // const list = JSON.stringify(posts);
    console.log(posts);
    if (posts.deletedCount === 0) {
      //throw new Error("게시글 조회에 실패하였습니다.").status(404);
      const error = new Error("게시글 조회에 실패하였습니다");
      error.status = 404;
      throw error;
    }

    //else {
    //   res.json({ message: "게시글을 삭제하였습니다." });
    // }
    res.json({ message: "게시글을 삭제하였습니다." });
  } catch (error) {
    console.log(error.status);
    console.log(error.message);
    if (error.status !== 404) {
      error.status = 400;
      error.message = "데이터 형식이 올바르지 않습니다.";
    }
    return next(error);
  }

  //res.send("게시글 삭제 API");
});

module.exports = post_router;
