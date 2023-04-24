const express = require("express");
const post_router = express.Router();
const Posts = require("../schemas/post");

// GET /posts : 게시글 조회 API
post_router.get("/", async (req, res) => {
  let posts = await Posts.find({}, { password: 0, content: 0, __v: 0 });
  //const list = JSON.stringify(posts);

  res.json({ data: posts });
  //res.send("게시글 조회 API");
});

// post /posts : 게시글 생성 API
post_router.post("/", async (req, res) => {
  const { user, password, title, content } = req.body;
  if (!user || !password || !title || !content) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  await Posts.create({
    user,
    password,
    title,
    content,
  })
    .then((post) => {
      //console.log("New post saved successfully!");
      console.log(post);
      //res.send({ message: "게시글을 생성하였습니다." });
      res.status(201).json({ message: "게시글을 생성하였습니다." });
    })
    .catch((error) => {
      //console.error(error);
      res.status(400).json({ message: "데이터 형식이 올바르지 않습니다." });
    });

  // res.json({ message: "게시글을 생성하였습니다." });
  // res.send({ message: "게시글을 생성하였습니다." });
});

// GET /posts/:id : 게시글 상세조회 API
post_router.get("/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);
  if (!id) {
    return res
      .status(400)
      .json({ message: "데이터 형식이 올바르지 않습니다." });
  }
  const posts = await Posts.findOne({ _id: id }, { __v: 0 });
  // const list = JSON.stringify(posts);
  console.log(posts);

  res.json({ data: posts });

  //res.send("게시글 상세조회 API");
});

// PUT /posts/:id : 게시글 수정 API
post_router.put("/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  console.log(req.body);

  const { password, title, content } = req.body;
  console.log(password, title, content);

  // Post.updateOne({ _id: id, password: password }, { title, content })
  await Posts.updateOne({ _id: id }, { title: title, content: content });

  // const list = JSON.stringify(posts);
  // console.log(posts);

  // res.json({ data: posts });
  res.send("게시글 수정 API");
});

// DELETE /posts/:id : 게시글 삭제 API
post_router.delete("/:id", async (req, res) => {
  console.log("req : ", req.params);
  const { id } = req.params;
  console.log("_id : ", id);

  const posts = await Posts.findByIdAndDelete(id);
  // const list = JSON.stringify(posts);
  console.log(posts);
  if (posts === null) {
    res.status(400).json({
      message: "message: '게시글 조회에 실패하였습니다.",
    });
  } else {
    res.json({ message: "게시글을 삭제하였습니다." });
  }

  //res.send("게시글 삭제 API");
});

module.exports = post_router;
