const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/post");

// GET /posts : 게시글 조회 API
post_router.get("/", async (req, res, next) => {
  let posts = await Posts.find({}, { password: 0, content: 0, __v: 0 }).sort({
    createdAt: -1,
  });
  //const list = JSON.stringify(posts);

  res.json({ data: posts });
  //res.send("게시글 조회 API");
});

// post /posts : 게시글 생성 API
post_router.post("/", async (req, res, next) => {
  try {
    const { user, password, title, content } = req.body;
    if (!user || !password || !title || !content) {
      throw new Error("데이터 형식이 올바르지 않습니다.");
    }
    await Posts.create({
      user,
      password,
      title,
      content,
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
    res.json({ data: posts });
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

// PUT /posts/:id : 게시글 수정 API
post_router.put("/:id", async (req, res, next) => {
  //TODO : throw 만들어주기

  try {
    console.log("req : ", req.params);
    const { id } = req.params;
    console.log("_id : ", id);

    console.log(req.body);

    const { password, title, content } = req.body;
    console.log(password, title, content);

    // Post.updateOne({ _id: id, password: password }, { title, content })
    const posts = await Posts.updateOne(
      { _id: id, password: password },
      { title: title, content: content }
    );

    // const list = JSON.stringify(posts);
    console.log(posts);

    // res.json({ data: posts });
    res.send("게시글 수정 API");
  } catch (error) {
    error.status = 400;
    return next(error);
  }
});

// DELETE /posts/:id : 게시글 삭제 API
post_router.delete("/:id", async (req, res, next) => {
  try {
    console.log("req : ", req.params);
    console.log("body : ", req.body);
    const { id } = req.params;
    const { password } = req.body;

    console.log("_id : ", id);
    console.log("password : ", password);

    const posts = await Posts.deleteOne({ _id: id, password: password });
    // const list = JSON.stringify(posts);
    console.log(posts);
    if (posts.deletedCount === 0) {
      //throw new Error("게시글 조회에 실패하였습니다.").status(404);
      throw { message: "게시글 조회에 실패하였습니다", status: 404 };
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
